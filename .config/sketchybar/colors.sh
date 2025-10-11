#!/bin/bash

# Catppuccin Mocha palette

# export BASE=0xff1e1e2e
# export MANTLE=0xff181825
# export CRUST=0xff11111b
#
# export TEXT=0xffcdd6f4
# export SUBTEXT0=0xffa6adc8
# export SUBTEXT1=0xffbac2de
#
# export SURFACE0=0xff313244
# export SURFACE1=0xff45475a
# export SURFACE2=0xff585b70
#
# export OVERLAY0=0xff6c7086
# export OVERLAY1=0xff7f849c
# export OVERLAY2=0xff9399b2
#
# # Color Palette
# export BLUE=0xff89b4fa
# export LAVENDER=0xffb4befe
# export SAPPHIRE=0xff74c7ec
# export SKY=0xff89dceb
# export TEAL=0xff94e2d5
# export YELLOW=0xfff9e2af
# export PEACH=0xfffab387
# export MAROON=0xffeba0ac
# export RED=0xfff38ba8
# export MAUVE=0xffcba6f7
# export PINK=0xfff5c2e7
# export FLAMINGO=0xfff2cdcd
# export ROSEWATER=0xfff5e0dc
# export BLACK=0xff181825
# export WHITE=0xffcdd6f4
# export GREEN=0xffa6e3a1
# export ORANGE=0xfffab387
# export MAGENTA=0xffcba6f7
# export GREY=0xff6c7086
# export TRANSPARENT=0x00000000
#
# export RANDOM_CAT_COLOR=("$BLUE" "$LAVENDER" "$SAPPHIRE" "$SKY" "$TEAL" "$GREEN" "$YELLOW" "$PEACH" "$MAROON" "$RED" "$MAUVE" "$PINK" "$FLAMINGO" "$ROSEWATER")
#
# function getRandomCatColor() {
#   echo "${RANDOM_CAT_COLOR[$RANDOM % ${#RANDOM_CAT_COLOR[@]}]}"
# }
#
# # General bar colors
# export BAR_COLOR=0xa01e1e2e
# export ICON_COLOR=$WHITE  # Color of all icons
# export LABEL_COLOR=$WHITE # Color of all labels
# export BACKGROUND_1=0x90313244
# export BACKGROUND_2=0x9045475a
#
# export POPUP_BACKGROUND_COLOR=0xff1e1e2e
# export POPUP_BORDER_COLOR=$WHITE
#
# export SHADOW_COLOR=$BLACK

# Kanagawa Theme

# ===================================================================
# Kanagawa Color Palette (Wave Theme)
# ===================================================================

# --- Main Palette ---
export KANAGAWA_FUJI_WHITE=0xffDCD7BA # Main text
export KANAGAWA_OLD_WHITE=0xffC8C093  # Lighter text, branch names
export KANAGAWA_SUMI_INK_1=0xff1F1F28 # Main background
export KANAGAWA_SUMI_INK_2=0xff2A2A37 # Lighter background
export KANAGAWA_SUMI_INK_3=0xff363646 # UI components, popups
export KANAGAWA_SUMI_INK_0=0xff16161D # Darkest background, for shadows

# --- Accent Colors ---
export KANAGAWA_DRAGON_BLUE=0xff7FB4CA  # Blue
export KANAGAWA_WAVE_AQUA=0xff7AA89F    # Teal/Cyan
export KANAGAWA_SPRING_GREEN=0xff98BB6C # Green
export KANAGAWA_RONIN_YELLOW=0xffFF9E3B # Yellow
export KANAGAWA_AUTUMN_ORANGE=0xffFFA066# Orange
export KANAGAWA_CARP_RED=0xffE67E80    # Red
export KANAGAWA_SAKURA_PINK=0xffD27E99 # Pink/Magenta
export KANAGAWA_FUJI_GRAY=0xff727169   # Grey, for dimmed text

# ===================================================================
# Mapping to Generic Variables for Sketchybar
# ===================================================================
# This section maps the Kanagawa palette to the variable names your
# Sketchybar configuration scripts are likely to use.

# --- Backgrounds ---
export BASE=$KANAGAWA_SUMI_INK_1
export MANTLE=$KANAGAWA_SUMI_INK_2
export CRUST=$KANAGAWA_SUMI_INK_0

# --- Foregrounds ---
export TEXT=$KANAGAWA_FUJI_WHITE
export SUBTEXT0=$KANAGAWA_OLD_WHITE
export SUBTEXT1=$KANAGAWA_FUJI_GRAY

# --- UI Surfaces ---
export SURFACE0=$KANAGAWA_SUMI_INK_3
export SURFACE1=0xff4F4F60 # A slightly lighter custom mix for surfaces
export SURFACE2=0xff54546D

# --- Overlays ---
export OVERLAY0=0xff6c7086 # Using existing values from Catppuccin that fit well
export OVERLAY1=0xff7f849c
export OVERLAY2=0xff9399b2

# --- Standard Accent Colors ---
export BLUE=$KANAGAWA_DRAGON_BLUE
export LAVENDER=$KANAGAWA_SAKURA_PINK # Mapping Lavender to Sakura Pink
export SAPPHIRE=$KANAGAWA_DRAGON_BLUE # Mapping Sapphire to Dragon Blue
export SKY=$KANAGAWA_WAVE_AQUA
export TEAL=$KANAGAWA_WAVE_AQUA
export GREEN=$KANAGAWA_SPRING_GREEN
export YELLOW=$KANAGAWA_RONIN_YELLOW
export PEACH=$KANAGAWA_AUTUMN_ORANGE
export MAROON=$KANAGAWA_CARP_RED
export RED=$KANAGAWA_CARP_RED
export MAUVE=$KANAGAWA_SAKURA_PINK
export PINK=$KANAGAWA_SAKURA_PINK
export ORANGE=$KANAGAWA_AUTUMN_ORANGE

# --- System Colors ---
export BLACK=$KANAGAWA_SUMI_INK_0
export WHITE=$KANAGAWA_FUJI_WHITE
export GREY=$KANAGAWA_FUJI_GRAY
export TRANSPARENT=0x00000000

# ===================================================================
# Random Color Function
# ===================================================================
# Provides a random color from the accent palette for dynamic items.

export RANDOM_KANAGAWA_COLOR=(
  "$KANAGAWA_DRAGON_BLUE"
  "$KANAGAWA_WAVE_AQUA"
  "$KANAGAWA_SPRING_GREEN"
  "$KANAGAWA_RONIN_YELLOW"
  "$KANAGAWA_AUTUMN_ORANGE"
  "$KANAGAWA_CARP_RED"
  "$KANAGAWA_SAKURA_PINK"
)

function getRandomKanagawaColor() {
  echo "${RANDOM_KANAGAWA_COLOR[$RANDOM % ${#RANDOM_KANAGAWA_COLOR[@]}]}"
}

# ===================================================================
# General Bar and Item Colors
# ===================================================================

# Main bar color with transparency (0xa0 = 63% opacity)
export BAR_COLOR=0xa01F1F28

# Default icon and label colors
export ICON_COLOR=$WHITE
export LABEL_COLOR=$WHITE

# Background colors for individual items with transparency (0x90 = 56% opacity)
export BACKGROUND_1=0x90363646
export BACKGROUND_2=0x9054546D

# Popup window colors
export POPUP_BACKGROUND_COLOR=$KANAGAWA_SUMI_INK_2
export POPUP_BORDER_COLOR=$KANAGAWA_DRAGON_BLUE # Using an accent for the border

# Shadow color for popups and the bar
export SHADOW_COLOR=$BLACK
