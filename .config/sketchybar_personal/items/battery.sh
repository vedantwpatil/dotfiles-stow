#!/bin/bash

sketchybar --add item battery right \
  --set battery \
  update_freq=120 \
  icon.font="$FONT:Bold:14.0" \
  icon.padding_right=0 \
  label.width=25 \
  label.align=right \
  script="$PLUGIN_DIR/battery.sh"
