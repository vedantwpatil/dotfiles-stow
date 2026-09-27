#!/usr/bin/env python3
"""Render icon.svg and package Ghostty.icns (kanagawa-paper-ink ghost).

Usage: python3 variants.py && python3 build.py   (needs rsvg-convert, magick)
"""
import struct
import subprocess
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent

# Kanagawa Paper Ink palette (matches ../themes/kanagawa-paper-ink)
INK0, INK1, INK2, INK3 = "#16161D", "#1F1F28", "#2A2A37", "#363646"
FUJI, OLD_WHITE = "#DCD7BA", "#C8C093"
CORAL, ROSE, GOLD, LAV = "#c4746e", "#E46876", "#E6C384", "#938AA9"


def squircle(cx=512, cy=512, a=412, n=5.0, steps=720):
    """Superellipse approximating the macOS icon continuous-corner shape."""
    import math

    pts = []
    for i in range(steps):
        t = 2 * math.pi * i / steps
        c, s = math.cos(t), math.sin(t)
        x = cx + a * math.copysign(abs(c) ** (2 / n), c)
        y = cy + a * math.copysign(abs(s) ** (2 / n), s)
        pts.append(f"{x:.1f},{y:.1f}")
    return "M" + " L".join(pts) + " Z"


GHOST = (
    "M312 715 L312 470 C312 350 400 262 512 262 C624 262 712 350 712 470 "
    "L712 715 Q712 775 645 775 Q579 775 579 715 "
    "Q579 775 512 775 Q445 775 445 715 "
    "Q445 775 379 775 Q312 775 312 715 Z"
)

SVG = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <clipPath id="body"><path d="{squircle()}"/></clipPath>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{INK3}"/>
      <stop offset="0.55" stop-color="{INK1}"/>
      <stop offset="1" stop-color="{INK0}"/>
    </linearGradient>
    <radialGradient id="ink" cx="0.18" cy="0.95" r="0.75">
      <stop offset="0" stop-color="{ROSE}" stop-opacity="0.55"/>
      <stop offset="0.45" stop-color="{CORAL}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="{CORAL}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lav" cx="0.85" cy="0.08" r="0.6">
      <stop offset="0" stop-color="{LAV}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="{LAV}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.14"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ghostfill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{FUJI}"/>
      <stop offset="1" stop-color="{OLD_WHITE}"/>
    </linearGradient>
    <filter id="drop" x="-20%" y="-20%" width="140%" height="150%">
      <feGaussianBlur stdDeviation="22"/>
    </filter>
    <filter id="halo" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="34"/>
    </filter>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <!-- system-style ground shadow -->
  <path d="{squircle()}" transform="translate(0 16)" fill="#000" opacity="0.5" filter="url(#drop)"/>

  <g clip-path="url(#body)">
    <rect width="1024" height="1024" fill="url(#glass)"/>
    <rect width="1024" height="1024" fill="url(#ink)"/>
    <rect width="1024" height="1024" fill="url(#lav)"/>

    <!-- dim ink-wash strokes echoing the wallpaper -->
    <path d="M60 880 C260 760 330 900 520 820 C700 745 790 930 980 850 L980 1000 L60 1000 Z"
          fill="{CORAL}" opacity="0.10" filter="url(#soft)"/>

    <g transform="translate(512 518) scale(0.92) translate(-512 -518)">
    <!-- ghost halo -->
    <path d="{GHOST}" fill="{GOLD}" opacity="0.38" filter="url(#halo)"/>
    <!-- ghost -->
    <path d="{GHOST}" fill="url(#ghostfill)"/>
    <path d="{GHOST}" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>

    <!-- face: prompt chevron + cursor underscore -->
    <polyline points="415,455 475,505 415,555" fill="none" stroke="{INK1}"
              stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="518" y1="560" x2="612" y2="560" stroke="{CORAL}"
          stroke-width="36" stroke-linecap="round"/>
    </g>

    <rect width="1024" height="512" fill="url(#sheen)"/>
  </g>

  <!-- glass rim -->
  <path d="{squircle()}" fill="none" stroke="{FUJI}" stroke-opacity="0.16" stroke-width="3"/>
  <path d="{squircle(a=410)}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="2"/>
</svg>
"""


def run(*cmd):
    subprocess.run(cmd, check=True)


# Variant from variants/ (rendered by variants.py) to ship instead of SVG above;
# None ships the original glowing ghost.
CHOSEN = "15-crimson"


def main():
    svg = HERE / "icon.svg"
    svg.write_text((HERE / "variants" / f"{CHOSEN}.svg").read_text() if CHOSEN else SVG)

    png = HERE / "icon.png"
    run("rsvg-convert", "-w", "1024", "-h", "1024", str(svg), "-o", str(png))

    # iconutil needs IconServices (blocked in some sandboxes), so pack the ICNS by hand:
    # 'icns' + total length, then (type, length, PNG bytes) chunks.
    chunks = [
        (b"icp4", 16), (b"icp5", 32), (b"icp6", 64),
        (b"ic07", 128), (b"ic08", 256), (b"ic09", 512), (b"ic10", 1024),
        (b"ic11", 32), (b"ic12", 64), (b"ic13", 256), (b"ic14", 512),
    ]
    body = b""
    with tempfile.TemporaryDirectory() as tmp:
        for tag, px in chunks:
            out = Path(tmp) / f"{tag.decode()}.png"
            run("magick", str(png), "-resize", f"{px}x{px}", f"PNG32:{out}")
            data = out.read_bytes()
            body += tag + struct.pack(">I", len(data) + 8) + data
    (HERE / "Ghostty.icns").write_bytes(b"icns" + struct.pack(">I", len(body) + 8) + body)


if __name__ == "__main__":
    main()
