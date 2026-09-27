#!/usr/bin/env python3
"""Render alternative kanagawa-paper-ink Ghostty icons + a contact sheet."""
import math
import random
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import (squircle, GHOST, INK0, INK1, INK2, INK3, FUJI, OLD_WHITE,
                   CORAL, ROSE, GOLD, LAV)

OUT = Path(__file__).resolve().parent / "variants"
OUT.mkdir(exist_ok=True)
BLUE, TEAL, WAVE, PAPER = "#658594", "#7AA89F", "#859fac", "#d5cea3"
SQ = squircle()


def frame(defs, body, rim=FUJI):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <clipPath id="body"><path d="{SQ}"/></clipPath>
    <filter id="drop" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur stdDeviation="22"/></filter>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.12"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    {defs}
  </defs>
  <path d="{SQ}" transform="translate(0 16)" fill="#000" opacity="0.5" filter="url(#drop)"/>
  <g clip-path="url(#body)">{body}<rect width="1024" height="512" fill="url(#sheen)"/></g>
  <path d="{SQ}" fill="none" stroke="{rim}" stroke-opacity="0.16" stroke-width="3"/>
</svg>"""


# 1. Sumi-e: paper-ink brush ghost outline + red hanko seal (echoes the wallpaper)
sumie = frame(
    f"""<filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4"/>
      <feDisplacementMap in="SourceGraphic" scale="18"/></filter>
    <filter id="wash"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="9"/>
      <feColorMatrix values="0 0 0 0 0.77  0 0 0 0 0.45  0 0 0 0 0.43  0 0 0 0.9 -0.35"/></filter>""",
    f"""<rect width="1024" height="1024" fill="{INK1}"/>
    <rect width="1024" height="1024" filter="url(#wash)" opacity="0.55"/>
    <g filter="url(#brush)">
      <path d="{GHOST}" fill="{INK0}" opacity="0.55" transform="translate(10 14)"/>
      <path d="{GHOST}" fill="none" stroke="{FUJI}" stroke-width="30" stroke-linejoin="round"/>
      <polyline points="415,455 475,505 415,555" fill="none" stroke="{FUJI}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <rect x="690" y="690" width="120" height="120" rx="14" fill="{CORAL}" transform="rotate(-4 750 750)"/>
    <text x="750" y="782" font-family="Hiragino Mincho ProN, serif" font-size="92" font-weight="700" fill="{INK1}" text-anchor="middle" transform="rotate(-4 750 750)">幽</text>""",
)

# 2. Great Wave: small ghost riding a kanagawa wave in the muted blues/teals
wave = frame(
    f"""<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK2}"/><stop offset="1" stop-color="{INK0}"/></linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{WAVE}"/><stop offset="1" stop-color="{BLUE}" stop-opacity="0.6"/></linearGradient>""",
    f"""<rect width="1024" height="1024" fill="url(#sky)"/>
    <circle cx="760" cy="260" r="110" fill="{CORAL}" opacity="0.85"/>
    <path d="M0 760 C180 700 250 560 420 520 C560 488 640 560 600 640 C570 700 500 680 520 630
             C700 700 860 640 1024 700 L1024 1024 L0 1024 Z" fill="url(#sea)"/>
    <path d="M0 860 C200 800 400 900 620 830 C800 775 900 860 1024 820 L1024 1024 L0 1024 Z" fill="{BLUE}"/>
    <path d="M420 520 C470 505 520 520 540 545 M470 540 C500 530 530 540 545 560" fill="none" stroke="{FUJI}" stroke-width="10" stroke-linecap="round"/>
    <g transform="translate(250 180) scale(0.55)">
      <path d="{GHOST}" fill="{FUJI}"/>
      <polyline points="415,455 475,505 415,555" fill="none" stroke="{INK1}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="518" y1="560" x2="612" y2="560" stroke="{CORAL}" stroke-width="40" stroke-linecap="round"/>
    </g>""",
)

# 3. Pixel: 12x12 pixel ghost in coral, crisp — sits well beside the Claude mascot
PIX = [
    "....XXXX....",
    "..XXXXXXXX..",
    ".XXXXXXXXXX.",
    ".XX.XXXX.XX.",
    "XXX..XXX..XX".replace("..", "..", 1),
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
    "XX.XXX.XXX.X",
    "X...X...X...",
]
cell = 48
ox, oy = 512 - 6 * cell, 512 - len(PIX) * cell // 2
rects = "".join(
    f'<rect x="{ox + c * cell}" y="{oy + r * cell}" width="{cell + 1}" height="{cell + 1}"/>'
    for r, row in enumerate(PIX) for c, ch in enumerate(row) if ch == "X")
pixel = frame(
    f"""<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="{ROSE}" stop-opacity="0.35"/><stop offset="1" stop-color="{ROSE}" stop-opacity="0"/></radialGradient>
    <pattern id="scan" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="3" fill="#000" opacity="0.18"/></pattern>""",
    f"""<rect width="1024" height="1024" fill="{INK1}"/>
    <rect width="1024" height="1024" fill="url(#glow)"/>
    <g fill="{CORAL}">{rects}</g>
    <rect x="{ox + 9 * cell}" y="{oy + 11 * cell + 20}" width="{cell * 2}" height="18" fill="{GOLD}"/>
    <rect width="1024" height="1024" fill="url(#scan)"/>""",
)

# 4. Chōchin lantern: ghost as a glowing paper lantern (gold/coral light on ink)
ribs = "".join(
    f'<path d="M322 {y} Q512 {y + 18} 702 {y}" fill="none" stroke="{CORAL}" stroke-opacity="0.35" stroke-width="5"/>'
    for y in range(360, 720, 52))
lantern = frame(
    f"""<radialGradient id="light" cx="0.5" cy="0.55" r="0.55">
      <stop offset="0" stop-color="{GOLD}"/><stop offset="0.7" stop-color="{CORAL}"/><stop offset="1" stop-color="{ROSE}"/></radialGradient>
    <radialGradient id="aura" cx="0.5" cy="0.52" r="0.5">
      <stop offset="0" stop-color="{GOLD}" stop-opacity="0.45"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>""",
    f"""<rect width="1024" height="1024" fill="{INK0}"/>
    <rect width="1024" height="1024" fill="url(#aura)"/>
    <rect x="420" y="210" width="184" height="46" rx="10" fill="{INK3}"/>
    <path d="{GHOST}" fill="url(#light)"/>
    {ribs}
    <polyline points="415,455 475,505 415,555" fill="none" stroke="{INK1}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="518" y1="560" x2="612" y2="560" stroke="{INK1}" stroke-width="36" stroke-linecap="round"/>""",
)

SUMI, CARP, SPRING, WAVE_AQUA, VIOLET, BOAT = "#393836", "#c4b28a", "#699469", "#7AA89F", "#a292a3", "#8ea49e"
BRUSH = """<filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="{seed}"/>
      <feDisplacementMap in="SourceGraphic" scale="{scale}"/></filter>"""
GRAIN = """<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 {r}  0 0 0 0 {g}  0 0 0 0 {b}  0 0 0 0.10 0"/></filter>"""


def face(prompt, cursor, w=36):
    return (f'<polyline points="415,455 475,505 415,555" fill="none" stroke="{prompt}" stroke-width="{w}" '
            f'stroke-linecap="round" stroke-linejoin="round"/>'
            f'<line x1="518" y1="560" x2="612" y2="560" stroke="{cursor}" stroke-width="{w}" stroke-linecap="round"/>')


def ghost(fill, prompt, cursor, x=512, y=518, s=1.0, extra=""):
    return (f'<g transform="translate({x} {y}) scale({s}) translate(-512 -518)">'
            f'<path d="{GHOST}" fill="{fill}"/>{extra}{face(prompt, cursor)}</g>')


# 5. Tsuki: ghost silhouetted against a carp-yellow moon, plum branch in coral
blossoms = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>' for x, y, r, c in [
    (860, 460, 26, CORAL), (770, 600, 22, ROSE), (872, 650, 20, CORAL), (700, 700, 18, CORAL),
    (820, 520, 14, ROSE), (650, 770, 14, ROSE), (905, 410, 12, CORAL)])
tsuki = frame(
    f"""<linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK3}"/><stop offset="1" stop-color="{INK1}"/></linearGradient>
    <radialGradient id="moonglow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.55" stop-color="{CARP}" stop-opacity="0.35"/><stop offset="1" stop-color="{CARP}" stop-opacity="0"/></radialGradient>
    {BRUSH.format(seed=7, scale=14)}""",
    f"""<rect width="1024" height="1024" fill="url(#night)"/>
    <circle cx="560" cy="440" r="380" fill="url(#moonglow)"/>
    <circle cx="560" cy="440" r="260" fill="{CARP}"/>
    <circle cx="640" cy="380" r="60" fill="{OLD_WHITE}" opacity="0.25"/>
    {ghost(INK1, CARP, CORAL, x=470, y=600, s=0.72)}
    <path d="M900 400 C840 480 780 560 720 660 C690 710 650 760 600 800 M790 540 C830 560 860 600 870 650"
          fill="none" stroke="{SUMI}" stroke-width="22" stroke-linecap="round" filter="url(#brush)"/>
    {blossoms}""",
)

# 6. Palette: ghost above the theme's own ANSI swatches
SWATCHES = [CORAL, CARP, SPRING, WAVE_AQUA, BLUE, LAV, VIOLET, ROSE]
swatches = "".join(
    f'<rect x="{212 + i * 76}" y="760" width="64" height="64" rx="16" fill="{c}"/>' for i, c in enumerate(SWATCHES))
palette = frame(
    f"""<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK2}"/><stop offset="1" stop-color="{INK0}"/></linearGradient>""",
    f"""<rect width="1024" height="1024" fill="url(#bg)"/>
    {ghost(FUJI, INK1, CORAL, y=430, s=0.78)}
    {swatches}""",
)

# 7. Ensō: coral dry-brush circle framing a fuji-white ghost
enso = frame(
    f"""{BRUSH.format(seed=11, scale=22)}
    {GRAIN.format(r=0.86, g=0.84, b=0.73)}""",
    f"""<rect width="1024" height="1024" fill="{INK1}"/>
    <rect width="1024" height="1024" filter="url(#grain)"/>
    <g filter="url(#brush)" transform="rotate(-70 512 512)">
      <circle cx="512" cy="512" r="320" fill="none" stroke="{CORAL}" stroke-width="64"
              stroke-dasharray="1760 350" stroke-linecap="round"/>
      <circle cx="518" cy="506" r="312" fill="none" stroke="{ROSE}" stroke-opacity="0.45" stroke-width="18"
              stroke-dasharray="1500 610" stroke-linecap="round"/>
    </g>
    {ghost(FUJI, INK1, CORAL, y=530, s=0.62)}""",
)

# 8. Hanko: the whole icon is a red seal with the ghost carved out
hanko = frame(
    BRUSH.format(seed=2, scale=16),
    f"""<rect width="1024" height="1024" fill="{INK1}"/>
    <g filter="url(#brush)" transform="rotate(-4 512 512)">
      <rect x="222" y="222" width="580" height="580" rx="48" fill="{CORAL}"/>
      <rect x="262" y="262" width="500" height="500" rx="28" fill="none" stroke="{INK1}" stroke-width="10"/>
      {ghost(INK1, CORAL, CARP, y=530, s=0.72)}
    </g>""",
)

# 9. Washi: light variant, ink ghost on warm paper (palette 15 / 7)
washi = frame(
    f"""<linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{PAPER}"/><stop offset="1" stop-color="{OLD_WHITE}"/></linearGradient>
    {GRAIN.format(r=0.22, g=0.22, b=0.21)}
    {BRUSH.format(seed=5, scale=8)}""",
    f"""<rect width="1024" height="1024" fill="url(#paper)"/>
    <rect width="1024" height="1024" filter="url(#grain)"/>
    <circle cx="790" cy="230" r="70" fill="{CORAL}"/>
    <g filter="url(#brush)">{ghost(INK1, PAPER, CORAL, y=560, s=0.84)}</g>""",
    rim=INK1,
)

# 10-13. Matched to the recolored app set (../../icons/recolor.py): a flat
# shaded tile in a muted palette tone, cream glyph, no glow or texture.
def tile(top, bottom, prompt=INK1, cursor=CORAL):
    return frame(
        f"""<linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{top}"/><stop offset="1" stop-color="{bottom}"/></linearGradient>
    <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{FUJI}"/><stop offset="1" stop-color="{OLD_WHITE}"/></linearGradient>""",
        f"""<rect width="1024" height="1024" fill="url(#tile)"/>
    {ghost("url(#cream)", prompt, cursor, y=530, s=0.86)}""",
    )


set_ink = tile(INK3, INK0)
set_slate = tile("#71879a", "#46525c")
set_clay = tile("#8f625c", "#5a3c39", cursor=INK2)
set_lav = tile("#7e7791", "#4f4a5e")

# 15-19. Fitted to the wallpaper (red brush waves, cream foam, ink-navy sky,
# mauve/slate shading, snow spray) and the full ink palette. Sampled from the
# wallpaper: ~45% ink navy, ~21% cool cream, ~15% mauve-grey, red only ~3% but
# it is the accent. Every hex below is a kanagawa-paper-ink palette entry.
FOAM, MAUVE, SLATE, ASH, GREY = "#c5c9c5", "#a292a3", "#8992a7", "#717C7C", "#9e9b93"


def spray(seed, n, box, colors, rmin=3, rmax=10):
    """Snow / sea-spray dots, like the flecks scattered through the wallpaper."""
    rnd = random.Random(seed)
    x0, y0, x1, y1 = box
    return "".join(
        f'<circle cx="{rnd.uniform(x0, x1):.0f}" cy="{rnd.uniform(y0, y1):.0f}" r="{rnd.uniform(rmin, rmax):.1f}" '
        f'fill="{rnd.choice(colors)}" opacity="{rnd.uniform(0.45, 0.95):.2f}"/>' for _ in range(n))


def wave_arcs(color, cx=90, cy=1010, opacity=0.9, rings=None):
    """Concentric broken brush arcs sweeping up from the bottom-left, like the
    wallpaper's red curling wave. Needs the BRUSH filter in defs."""
    rings = rings or [(330, 40), (405, 34), (480, 30), (555, 24), (630, 20), (705, 15), (780, 11)]
    out = ""
    for i, (r, w) in enumerate(rings):
        circ = 2 * math.pi * r
        dash = f"{circ * 0.30:.0f} {circ * 0.035:.0f} {circ * 0.16:.0f} {circ * 0.05:.0f} {circ * 0.22:.0f} {circ * 0.04:.0f}"
        out += (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{color}" stroke-width="{w}" '
                f'stroke-linecap="round" stroke-dasharray="{dash}" stroke-dashoffset="{-circ * (0.70 + i * 0.03):.0f}" '
                f'opacity="{max(opacity - i * 0.07, 0.25):.2f}"/>')
    return f'<g filter="url(#brush)">{out}</g>'


# 15. Crimson wave: ink-navy night, red brush arcs sweeping up, spray, cream ghost
crimson = frame(
    f"""<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK3}"/><stop offset="0.5" stop-color="{INK1}"/><stop offset="1" stop-color="{INK0}"/></linearGradient>
    {BRUSH.format(seed=3, scale=20)}""",
    f"""<rect width="1024" height="1024" fill="url(#sky)"/>
    {spray(7, 34, (430, 90, 960, 560), [FOAM, FOAM, MAUVE], 3, 9)}
    {wave_arcs(CORAL)}
    {ghost(FUJI, INK1, CORAL, x=590, y=470, s=0.66)}""",
)

# 16. Sumi-line: the wallpaper's drawing style. Slate skin tone, flat cream fill with
# one hard shadow, heavy wobbly ink outline, red kumadori marks.
GH_CLIP = f'<clipPath id="gh"><path d="{GHOST}"/></clipPath>'
sumiline = frame(
    f"""<linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{SLATE}"/><stop offset="1" stop-color="#625e5a"/></linearGradient>
    {GH_CLIP}{BRUSH.format(seed=6, scale=12)}{GRAIN.format(r=0.09, g=0.09, b=0.12)}""",
    f"""<rect width="1024" height="1024" fill="url(#skin)"/>
    <rect width="1024" height="1024" filter="url(#grain)"/>
    <g transform="translate(512 528) scale(0.84) translate(-512 -518)">
      <g filter="url(#brush)">
        <path d="{GHOST}" fill="{FUJI}"/>
        <g clip-path="url(#gh)"><path d="{GHOST}" fill="{SLATE}" opacity="0.55" transform="translate(-70 0)"/></g>
        <path d="{GHOST}" fill="none" stroke="{INK0}" stroke-width="34" stroke-linejoin="round"/>
        <polyline points="415,455 475,505 415,555" fill="none" stroke="{INK0}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="518" y1="560" x2="612" y2="560" stroke="{CORAL}" stroke-width="38" stroke-linecap="round"/>
        <path d="M352 410 L318 372 M660 410 L694 372 M380 610 L372 690 M644 610 L652 690" fill="none" stroke="{CORAL}" stroke-width="14" stroke-linecap="round"/>
      </g>
    </g>""",
)

# 17. Foam: the light option. Cream foam tile with mauve/slate shadow blotches,
# ink ghost, one red brush ring. Stands out on a dark Dock.
def blob(cx, cy, rx, ry, rot, color, op):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" transform="rotate({rot} {cx} {cy})" fill="{color}" opacity="{op}"/>'


foam = frame(
    f"""<linearGradient id="foam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{FOAM}"/><stop offset="1" stop-color="{GREY}"/></linearGradient>
    {BRUSH.format(seed=12, scale=26)}{GRAIN.format(r=0.16, g=0.15, b=0.18)}""",
    f"""<rect width="1024" height="1024" fill="url(#foam)"/>
    <g filter="url(#brush)">
      {blob(220, 250, 190, 90, -25, MAUVE, 0.55)}{blob(830, 780, 210, 100, -30, SLATE, 0.45)}
      {blob(120, 760, 150, 70, 20, SLATE, 0.35)}{blob(800, 200, 120, 60, 15, MAUVE, 0.4)}
      <circle cx="512" cy="530" r="330" fill="none" stroke="{CORAL}" stroke-width="42" stroke-linecap="round"
              stroke-dasharray="1500 600" transform="rotate(-160 512 530)"/>
    </g>
    <rect width="1024" height="1024" filter="url(#grain)"/>
    {ghost(INK1, FOAM, CORAL, y=540, s=0.62)}""",
    rim=INK1,
)

# 18. Red wave: the wallpaper's red as the tile, ink brush arcs, cream ghost
redwave = frame(
    f"""<linearGradient id="red" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{CORAL}"/><stop offset="1" stop-color="#9d7665"/></linearGradient>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK1}" stop-opacity="0"/><stop offset="1" stop-color="{INK0}" stop-opacity="0.55"/></linearGradient>
    {BRUSH.format(seed=9, scale=18)}""",
    f"""<rect width="1024" height="1024" fill="url(#red)"/>
    <rect width="1024" height="1024" fill="url(#dusk)"/>
    {wave_arcs(INK1, cx=1000, cy=1010, opacity=0.6)}
    {spray(4, 22, (120, 100, 560, 480), [FOAM, FUJI], 3, 8)}
    {ghost(FUJI, INK1, INK1, x=470, y=540, s=0.66)}""",
)

# 19. Glare: the wallpaper's fierce eyes on the ghost, red at the outer corners
def eye(sx):
    """Half-lidded eye; sx=-1 left, +1 right (mirrored about x=512)."""
    x = lambda v: 512 + sx * (v - 512)
    return (f'<path d="M{x(392)} 486 Q{x(440)} 440 {x(490)} 476 Q{x(440)} 504 {x(392)} 486 Z" fill="{SLATE}" stroke="{INK0}" stroke-width="10" stroke-linejoin="round"/>'
            f'<circle cx="{x(452)}" cy="478" r="14" fill="{INK0}"/>'
            f'<path d="M{x(372)} 450 L{x(500)} 470" stroke="{INK0}" stroke-width="24" stroke-linecap="round"/>'
            f'<path d="M{x(392)} 490 L{x(350)} 520" stroke="{CORAL}" stroke-width="12" stroke-linecap="round"/>')


glare = frame(
    f"""<linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK3}"/><stop offset="1" stop-color="{INK0}"/></linearGradient>
    <linearGradient id="cream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{FUJI}"/><stop offset="1" stop-color="{OLD_WHITE}"/></linearGradient>""",
    f"""<rect width="1024" height="1024" fill="url(#night)"/>
    {spray(21, 26, (60, 80, 960, 420), [FOAM, MAUVE], 3, 8)}
    <g transform="translate(512 540) scale(0.86) translate(-512 -518)">
      <path d="{GHOST}" fill="url(#cream)"/>
      {eye(-1)}{eye(1)}
      <line x1="470" y1="600" x2="554" y2="600" stroke="{CORAL}" stroke-width="34" stroke-linecap="round"/>
    </g>""",
)

VARIANTS = {"1-sumie": sumie, "2-wave": wave, "3-pixel": pixel, "4-lantern": lantern,
            "5-tsuki": tsuki, "6-palette": palette, "7-enso": enso, "8-hanko": hanko, "9-washi": washi,
            "10-set-ink": set_ink, "11-set-slate": set_slate, "12-set-clay": set_clay, "13-set-lav": set_lav,
            "15-crimson": crimson, "16-sumiline": sumiline, "17-foam": foam, "18-redwave": redwave, "19-glare": glare}

pngs = []
for name, svg in VARIANTS.items():
    s, p = OUT / f"{name}.svg", OUT / f"{name}.png"
    s.write_text(svg)
    subprocess.run(["rsvg-convert", "-w", "512", "-h", "512", str(s), "-o", str(p)], check=True)
    pngs.append(str(p))

tiles = [str(Path(__file__).resolve().parent / "icon.png"), *pngs]
rows = [tiles[i:i + 5] for i in range(0, len(tiles), 5)]
cmd = ["magick", "-background", INK2]
for row in rows:
    cmd += ["(", *row, "-resize", "400x400", "-alpha", "remove", "-splice", "16x16", "+append", ")"]
subprocess.run([*cmd, "-append", "-gravity", "southeast", "-splice", "16x16",
                str(OUT / "sheet.png")], check=True)
print(OUT / "sheet.png")
