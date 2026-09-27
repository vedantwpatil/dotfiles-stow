#!/usr/bin/env python3
"""Gradient-map app icons onto the kanagawa-paper-ink palette.

Usage: python3 recolor.py [App ...]   (defaults to every app in APPS)
       python3 recolor.py --all       (every app in /Applications except SKIP)
Writes out/<App>.icns plus out/preview.png; apply.sh sets them with fileicon.
Needs Pillow and iconutil.
"""

import colorsys
import io
from itertools import accumulate
import plistlib
import struct
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"

# Kanagawa Paper Ink palette (matches ../ghostty/themes/kanagawa-paper-ink)
INK0, INK1, INK2 = "#16161D", "#1F1F28", "#2A2A37"
FUJI = "#DCD7BA"
CORAL, BLUE, LAV, AQUA, GOLD = "#c4746e", "#859fac", "#938AA9", "#8ea49e", "#c4b28a"

# App name in /Applications -> accent used for the icon's mid-tones.
# Apps not listed get an accent picked from their own brand hue (auto_accent).
APPS = {
    # "Spotify": AQUA,
    # "Obsidian": LAV,
    # "Discord": BLUE,
    # "Slack": CORAL,
    # "Helium": CORAL,
    # "Raycast": CORAL,
}

# Never recolored: SIP-protected (Safari) or hand-drawn elsewhere (Ghostty).
SKIP = {"Safari", "Ghostty"}


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def ramp(accent):
    """256-entry LUT: shadows -> ink, mid-tones -> accent, highlights -> cream."""
    stops = [(0.0, INK0), (0.30, INK2), (0.62, accent), (1.0, FUJI)]
    lut = []
    for i in range(256):
        t = i / 255
        for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
            if t <= t1:
                f = (t - t0) / (t1 - t0)
                a, b = hex_rgb(c0), hex_rgb(c1)
                lut.append(tuple(round(x + (y - x) * f) for x, y in zip(a, b)))
                break
    return lut


def source_png(app):
    """Largest PNG from the app's own .icns."""
    res = Path(f"/Applications/{app}.app/Contents")
    info = plistlib.loads((res / "Info.plist").read_bytes())
    name = info.get("CFBundleIconFile", "AppIcon")
    if name.endswith(".ico"):
        # Qt ports (sioyek) ship a Windows .ico; Pillow opens its largest frame.
        ico = Image.open(res / "Resources" / name)
        ico.size = max(ico.info["sizes"])
        return ico.convert("RGBA").resize((1024, 1024), Image.LANCZOS)
    icns = res / "Resources" / (name if name.endswith(".icns") else name + ".icns")
    if not icns.exists():
        # Some bundles name the file differently; take the biggest .icns present.
        found = sorted(
            (res / "Resources").glob("*.icns"), key=lambda p: p.stat().st_size
        )
        if not found:
            raise FileNotFoundError(f"{app}: no .icns (icon lives only in Assets.car)")
        icns = found[-1]
    with tempfile.TemporaryDirectory() as tmp:
        iconset = Path(tmp) / "src.iconset"
        subprocess.run(
            ["iconutil", "-c", "iconset", str(icns), "-o", str(iconset)], check=True
        )
        best = max(iconset.glob("*.png"), key=lambda p: Image.open(p).size[0])
        return Image.open(best).convert("RGBA").resize((1024, 1024), Image.LANCZOS)


# How much of each icon's brand color survives as the accent.
# (saturation ramp start, ramp end, max strength 0..1)
VARIANTS = {
    "mono": (255, 255, 0.0),
    "subtle": (90, 200, 0.45),
    "balanced": (60, 140, 0.8),
    "bold": (40, 80, 1.0),
}
VARIANT = "balanced"

# "tint": recolor() over a luminance ramp; "mapped" / "strict": remap() onto the full scheme.
MODE = "mapped"


def accent_mask(img, variant=None):
    """L-mode mask, 0..255: how strongly each pixel takes the flat accent color.

    Brand fills are saturated; glyphs, shadows and highlights are not, so
    saturation separates them without per-app rules. Dark pixels stay on the
    ramp even when saturated, so shading keeps its depth.
    """
    lo, hi, strength = VARIANTS[variant or VARIANT]
    hsv = img.convert("RGB").convert("HSV")
    sat, val = hsv.getchannel("S"), hsv.getchannel("V")
    span = max(hi - lo, 1)
    s = sat.point(lambda v: round(255 * strength * min(1, max(0, (v - lo) / span))))
    v = val.point(lambda x: min(255, max(0, (x - 40) * 4)))
    return ImageChops.multiply(s, v)


def auto_accent(img):
    """Palette accent nearest the icon's dominant brand hue.

    Hue is circular, so average it as a saturation-weighted vector sum rather
    than a plain mean (red at 350 and 10 degrees should average to 0, not 180).
    """
    import math

    small = img.resize((64, 64))
    x = y = 0.0
    for r, g, b, a in small.getdata():
        if a < 200:
            continue
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        w = s * v
        x += w * math.cos(2 * math.pi * h)
        y += w * math.sin(2 * math.pi * h)
    if math.hypot(x, y) < 20:  # effectively greyscale icon
        return CORAL
    hue = math.degrees(math.atan2(y, x)) % 360
    if hue < 25 or hue >= 330:
        return CORAL
    if hue < 70:
        return GOLD
    if hue < 175:
        return AQUA
    if hue < 235:
        return BLUE
    return LAV


def hue_to_accent(deg):
    """Palette RGB for a source hue in degrees (0..360).

    Multi-color icons (Slack, League, Excel) keep their separate regions
    because each source hue lands on its own palette color instead of one
    shared accent.
    """
    # Blend between the two nearest palette hues so gradients stay smooth.
    # The list repeats coral at 365 so hues past lavender wrap back to it.
    centres = [
        (5, CORAL),
        (42, GOLD),
        (160, AQUA),
        (200, BLUE),
        (258, LAV),
        (365, CORAL),
    ]
    deg = deg if deg >= 5 else deg + 360
    for (d0, c0), (d1, c1) in zip(centres, centres[1:]):
        if deg <= d1:
            f = (deg - d0) / (d1 - d0)
            return tuple(
                round(a + (b - a) * f) for a, b in zip(hex_rgb(c0), hex_rgb(c1))
            )
    return hex_rgb(CORAL)


def palette_layer(img, lum, pick):
    """Brand pixels recolored in palette hues, keeping the icon's own shading.

    Hue and saturation come from pick(source hue); value follows the stretched
    luminance, so gradients and bevels inside a fill survive the recolor.
    """
    h = img.convert("RGB").convert("HSV").getchannel("H")
    # PIL stores hue as 0..255; build the per-hue palette color once as a LUT.
    hsv = [
        colorsys.rgb_to_hsv(*(c / 255 for c in pick(i * 360 / 256))) for i in range(256)
    ]
    hue = h.point([round(x[0] * 255) for x in hsv])
    sat = h.point([round(x[1] * 255) for x in hsv])
    # The brightest brand pixel hits the palette color exactly; darker ones scale
    # down to 55% of it, so shading shows without washing out to cream.
    shade = lum.point(lambda v: round(255 * (0.55 + 0.45 * v / 255)))
    val = ImageChops.multiply(h.point([round(x[2] * 255) for x in hsv]), shade)
    return Image.merge("HSV", (hue, sat, val)).convert("RGB")


def recolor(img, accent, variant=None, pick=None):
    """pick maps source hue -> palette RGB; None keeps every region on accent."""
    alpha = img.getchannel("A")
    lum = img.convert("L")
    # Stretch luminance over opaque pixels only so each icon uses the full ramp.
    hist = lum.histogram(mask=alpha.point(lambda a: 255 if a > 200 else 0))
    lo = next(i for i, n in enumerate(hist) if n)
    hi = 255 - next(i for i, n in enumerate(reversed(hist)) if n)
    span = max(hi - lo, 1)
    lum = lum.point(lambda v: max(0, min(255, round((v - lo) * 255 / span))))
    # Light-background icons (Slack, Brave) would become bright cream tiles in a
    # dark Dock; flip them so the background lands on ink like everything else.
    opaque = alpha.point(lambda a: 255 if a > 200 else 0)
    hist = lum.histogram(mask=opaque)
    median = next(i for i, c in enumerate(accumulate(hist)) if c >= sum(hist) / 2)
    if median > 170:
        lum = lum.point(lambda v: 255 - v)

    lut = ramp(accent)
    rgb = Image.merge("RGB", [lum.point([c[k] for c in lut]) for k in range(3)])
    # Where the mask is white, the palette layer replaces the luminance ramp.
    pick = pick or (lambda deg: hex_rgb(accent))
    rgb = Image.composite(palette_layer(img, lum, pick), rgb, accent_mask(img, variant))
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return add_sheen(out)


def add_sheen(out):
    """Soft top sheen, same as the ghostty icon."""
    sheen = Image.new("L", out.size, 0)
    d = ImageDraw.Draw(sheen)
    for y in range(512):
        d.line([(0, y), (1024, y)], fill=round(36 * (1 - y / 512)))
    white = Image.new("RGBA", out.size, (255, 255, 255, 0))
    white.putalpha(ImageChops.multiply(sheen, out.getchannel("A")))
    return Image.alpha_composite(out, white)


# Every color the kanagawa-paper-ink theme uses: the 38 palette entries its
# nvim theme (kanagawa-paper.nvim themes/ink.lua) references, plus the bright
# ANSI colors the ghostty theme adds (waveRed, carpYellow, lotusWhite0).
# The shared palette also holds wave/lotus/canvas colors; those belong to the
# other variants, so they are left out.
SCHEME = [
    # sumiInk: backgrounds
    "#0f0f15", "#16161D", "#181820", "#1a1a22", "#1F1F28", "#2A2A37", "#363646", "#54546D",
    # dragonBlack / grays
    "#181616", "#1D1C19", "#393836", "#625e5a", "#727169", "#717C7C", "#737c73",
    "#7a8382", "#9e9b93", "#a6a69c", "#c5c9c5",
    # whites
    "#DCD7BA", "#C8C093", "#d5cea3",
    # accents
    "#c4746e", "#E46876", "#b6927b", "#9d7665", "#c4b28a", "#E6C384",
    "#699469", "#8a9a7b", "#717e67", "#8ea49e", "#6A9589", "#7AA89F",
    "#658594", "#859fac", "#435965", "#949fb5", "#8992a7", "#938AA9", "#a292a3",
]


def oklab(rgb):
    """sRGB floats (..., 3) in 0..1 -> OKLab (..., 3)."""
    c = np.where(rgb > 0.04045, ((rgb + 0.055) / 1.055) ** 2.4, rgb / 12.92)
    lms = np.cbrt(c @ np.array([
        [0.4122214708, 0.2119034982, 0.0883024619],
        [0.5363325363, 0.6806995451, 0.2817188376],
        [0.0514459929, 0.1073969566, 0.6299787005]]))
    return lms @ np.array([
        [0.2104542553, 1.9779984951, 0.0259040371],
        [0.7936177850, -2.4285922050, 0.7827717662],
        [-0.0040720468, 0.4505937099, -0.8086757660]])


def srgb(lab):
    """OKLab (..., 3) -> sRGB floats clipped to 0..1."""
    lms = (lab @ np.array([
        [1.0, 1.0, 1.0],
        [0.3963377774, -0.1055613458, -0.0894841775],
        [0.2158037573, -0.0638541728, -1.2914855480]])) ** 3
    c = lms @ np.array([
        [4.0767416621, -1.2684380046, -0.0041960863],
        [-3.3077115913, 2.6097574011, -0.7034186147],
        [0.2309699292, -0.3413193965, 1.7076147010]])
    c = np.clip(c, 0, 1)
    return np.where(c > 0.0031308, 1.055 * c ** (1 / 2.4) - 0.055, 12.92 * c)


def remap(img, strict=False):
    """Rebuild every pixel from scheme colors instead of tinting the original.

    Lightness is stretched into the scheme's ink..cream range (flipped for
    light-background icons). Colored pixels take the hue and chroma of the
    scheme color nearest in hue and lightness, so a gradient stays a gradient
    but every color reads as the scheme. Neutral pixels follow the warm
    ink -> cream axis instead of pure grey. strict=True then snaps each pixel
    to the nearest scheme color, so the icon contains nothing else.
    """
    arr = np.asarray(img, dtype=np.float64) / 255
    alpha = arr[..., 3]
    lab = oklab(arr[..., :3])
    L, ab = lab[..., 0], lab[..., 1:]
    chroma = np.hypot(ab[..., 0], ab[..., 1])

    solid = alpha > 0.8
    lo, hi = np.percentile(L[solid], [1, 99])
    t = np.clip((L - lo) / max(hi - lo, 1e-3), 0, 1)
    if np.median(t[solid]) > 0.66:
        t = 1 - t

    scheme = oklab(np.array([hex_rgb(h) for h in SCHEME]) / 255)
    ink, cream = oklab(np.array([hex_rgb(INK0), hex_rgb(FUJI)]) / 255)
    L_out = ink[0] + t * (cream[0] - ink[0])
    ab_out = ink[1:] + t[..., None] * (cream[1:] - ink[1:])

    # Colored scheme entries compete on hue first, lightness second.
    colored = scheme[np.hypot(scheme[:, 1], scheme[:, 2]) > 0.04]
    hue = np.arctan2(ab[..., 1], ab[..., 0])
    e_hue = np.arctan2(colored[:, 2], colored[:, 1])
    d_hue = np.abs(np.angle(np.exp(1j * (hue[..., None] - e_hue))))
    cost = d_hue + 1.5 * np.abs(L_out[..., None] - colored[:, 0])
    entry = colored[np.argmin(cost, axis=-1)]

    # w: how colored the source pixel is; greys stay on the ink/cream axis.
    w = np.clip((chroma - 0.02) / 0.08, 0, 1)[..., None]
    ab_out = ab_out * (1 - w) + entry[..., 1:] * w
    L_out = L_out * (1 - 0.5 * w[..., 0]) + entry[..., 0] * 0.5 * w[..., 0]
    out = np.dstack([L_out, ab_out])

    if strict:
        dist = ((out[..., None, :] - scheme) ** 2).sum(-1)
        out = scheme[np.argmin(dist, axis=-1)]

    rgb = np.round(srgb(out) * 255).astype(np.uint8)
    res = Image.fromarray(np.dstack([rgb, (alpha * 255).astype(np.uint8)]))
    return add_sheen(res)


def write_icns(img, path):
    chunks = [
        (b"icp4", 16),
        (b"icp5", 32),
        (b"icp6", 64),
        (b"ic07", 128),
        (b"ic08", 256),
        (b"ic09", 512),
        (b"ic10", 1024),
        (b"ic11", 32),
        (b"ic12", 64),
        (b"ic13", 256),
        (b"ic14", 512),
    ]
    body = b""
    for tag, px in chunks:
        buf = io.BytesIO()
        img.resize((px, px), Image.LANCZOS).save(buf, "PNG")
        data = buf.getvalue()
        body += tag + struct.pack(">I", len(data) + 8) + data
    path.write_bytes(b"icns" + struct.pack(">I", len(body) + 8) + body)


def sheet(apps, rows, path):
    """Grid preview: one row per (label, variant, accent override) on ink."""
    s, pad = 192, 24
    srcs = [source_png(a) for a in apps]
    img = Image.new(
        "RGBA", (s * len(apps) + pad * 6, s * (len(rows) + 1)), hex_rgb(INK1) + (255,)
    )
    d = ImageDraw.Draw(img)
    for r, (label, variant, accent) in enumerate([("original", None, None)] + rows):
        d.text((8, r * s + 8), label, fill=hex_rgb(FUJI))
        for i, (app, src) in enumerate(zip(apps, srcs)):
            tile = (
                src
                if variant is None
                else recolor(src, accent or APPS.get(app, CORAL), variant)
            )
            img.alpha_composite(
                tile.resize((s, s), Image.LANCZOS), (pad * 6 + i * s, r * s)
            )
    img.save(path)


def main():
    if sys.argv[1:2] == ["--sheet"]:
        rows = [(v, v, None) for v in VARIANTS] + [
            ("coral all", "balanced", CORAL),
            ("gold all", "balanced", GOLD),
            ("blue all", "balanced", BLUE),
        ]
        OUT.mkdir(exist_ok=True)
        sheet(list(APPS), rows, OUT / "variants.png")
        return
    if sys.argv[1:2] == ["--all"]:
        apps = sorted(
            p.stem for p in Path("/Applications").glob("*.app") if p.stem not in SKIP
        )
    else:
        apps = sys.argv[1:] or list(APPS)
    OUT.mkdir(exist_ok=True)
    tiles = []
    for app in apps:
        try:
            src = source_png(app)
        except (FileNotFoundError, subprocess.CalledProcessError, ValueError) as err:
            print(f"skip: {err}")
            continue
        # APPS entries stay single-accent; everything else keeps its own hues.
        if app in APPS:
            new = recolor(src, APPS[app])
        elif MODE != "tint":
            new = remap(src, strict=MODE == "strict")
        else:
            new = recolor(src, auto_accent(src), pick=hue_to_accent)
        write_icns(new, OUT / f"{app}.icns")
        tiles.append((src, new))
        print(f"ok: {app}")

    # Preview: pairs of (original, recolored), 6 pairs per row.
    s, per_row = 160, 6
    rows = (len(tiles) + per_row - 1) // per_row
    sheet_img = Image.new("RGBA", (s * 2 * per_row, s * rows), hex_rgb(INK1) + (255,))
    for i, (src, new) in enumerate(tiles):
        x, y = (i % per_row) * s * 2, (i // per_row) * s
        sheet_img.alpha_composite(src.resize((s, s), Image.LANCZOS), (x, y))
        sheet_img.alpha_composite(new.resize((s, s), Image.LANCZOS), (x + s, y))
    sheet_img.save(OUT / "preview.png")


if __name__ == "__main__":
    main()
