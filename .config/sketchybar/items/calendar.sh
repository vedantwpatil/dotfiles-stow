#!/bin/bash

calendar=(
  icon.font="$FONT:Black:12.0"
  icon.padding_right=0
  label.width=45
  label.align=right
  padding_left=1
  padding_right=1
  update_freq=30
  script="$PLUGIN_DIR/calendar.sh"
  click_script="open -a 'Calendar'"
)

sketchybar --add item calendar right \
           --set calendar "${calendar[@]}" \
           --subscribe calendar system_woke

# Single-item bracket for double-border effect
sketchybar --add bracket calendar.bracket calendar \
           --set calendar.bracket                  \
             background.color=$TRANSPARENT         \
             background.border_color=$GREY         \
             background.height=30                  \
             background.border_width=1

sketchybar --add item calendar.padding right \
           --set calendar.padding width=5
