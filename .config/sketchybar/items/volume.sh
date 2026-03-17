#!/bin/bash

volume_percent=(
  updates=on
  label="??%"
  label.font="$FONT:Semibold:12.0"
  script="$PLUGIN_DIR/volume.sh"
  click_script="$PLUGIN_DIR/volume_click.sh"
)

volume_icon=(
  padding_right=-1
  icon.drawing=off
  label.width=25
  label.align=left
  label.color=$GREY
  label.font="SF Pro:Regular:14.0"
  click_script="$PLUGIN_DIR/volume_click.sh"
)

sketchybar --add item volume_percent right              \
           --set volume_percent "${volume_percent[@]}"  \
           --subscribe volume_percent volume_change     \
                                                        \
           --add item volume_icon right                 \
           --set volume_icon "${volume_icon[@]}"

sketchybar --add bracket volume_bracket volume_icon volume_percent \
           --set volume_bracket                                    \
             background.color=$BACKGROUND_1                        \
             background.border_color=$BACKGROUND_2                 \
             background.border_width=2                             \
             popup.align=center

sketchybar --add item volume.padding right \
           --set volume.padding width=5
