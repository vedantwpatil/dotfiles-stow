#!/bin/bash

sketchybar --add item calendar right \
  --set calendar \
  icon=cal \
  icon.font="$FONT:Bold:14.0" \
  icon.padding_right=0 \
  label.width=50 \
  label.align=right \
  script="$PLUGIN_DIR/calendar.sh" \
  interval=30
