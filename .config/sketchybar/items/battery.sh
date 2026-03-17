#!/bin/bash

battery=(
  script="$PLUGIN_DIR/battery.sh"
  icon.font="$FONT:Regular:19.0"
  label.font="$FONT:Semibold:12.0"
  padding_right=0
  padding_left=0
  update_freq=120
  updates=on
  popup.align=center
)

sketchybar --add item battery right              \
           --set battery "${battery[@]}"         \
           --subscribe battery power_source_change system_woke routine mouse.clicked

# Remaining time popup item
sketchybar --add item battery.time popup.battery \
           --set battery.time                    \
             icon="Time remaining:"              \
             icon.width=100                      \
             icon.align=left                     \
             label="??:??h"                      \
             label.width=100                     \
             label.align=right

sketchybar --add bracket battery.bracket battery     \
           --set battery.bracket                     \
             background.color=$BACKGROUND_1          \
             background.border_color=$BACKGROUND_2   \
             background.border_width=2

sketchybar --add item battery.padding right \
           --set battery.padding width=5
