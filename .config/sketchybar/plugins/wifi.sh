#!/bin/bash

source "$HOME/.config/sketchybar/colors.sh"

IP=$(ipconfig getifaddr en0 2>/dev/null)

if [ -n "$IP" ]; then
  ICON="􀙇"
  COLOR=$WHITE
else
  ICON="􀙈"
  COLOR=$RED
fi

sketchybar --set "$NAME" icon="$ICON" icon.color=$COLOR
