#!/bin/bash

sketchybar --add item volume right \
  --set volume \
  icon.font="$FONT:Bold:14.0" \
  icon.padding_right=0 \
  label.width=25 \
  label.align=right \
  script="$PLUGIN_DIR/volume.sh" \
  --subscribe volume volume_change
