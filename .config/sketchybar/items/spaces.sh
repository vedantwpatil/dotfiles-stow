#!/bin/bash

sketchybar --add event aerospace_workspace_change

SPACE_ICONS=("1" "2" "3" "4" "5" "6" "7" "8" "9")

for i in "${!SPACE_ICONS[@]}"
do
  sid=$(($i+1))

  space=(
    icon=${SPACE_ICONS[i]}
    icon.font="$FONT:Regular:14.0"
    icon.padding_left=15
    icon.padding_right=8
    icon.color=$WHITE
    icon.highlight_color=$RED
    padding_left=1
    padding_right=1
    label.padding_right=20
    label.color=$GREY
    label.font="sketchybar-app-font:Regular:16.0"
    label.y_offset=-1
    label.drawing=off
    background.color=$BACKGROUND_1
    background.border_width=1
    background.height=26
    background.border_color=$BLACK
    script="$PLUGIN_DIR/space.sh"
  )

  sketchybar --add item space.$sid left             \
             --set space.$sid "${space[@]}"         \
             --subscribe space.$sid mouse.clicked aerospace_workspace_change

  # Single-item bracket per space for double-border highlight effect
  sketchybar --add bracket space.bracket.$sid space.$sid \
             --set space.bracket.$sid                    \
               background.color=$TRANSPARENT             \
               background.border_color=$BACKGROUND_2     \
               background.height=28                      \
               background.border_width=2
done
