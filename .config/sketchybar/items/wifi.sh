#!/bin/bash

wifi_item=(
  label.drawing=off
  icon="􀙇"
  icon.color=$GREY
  icon.font="SF Pro:Regular:14.0"
  padding_left=8
  padding_right=8
  script="$PLUGIN_DIR/wifi.sh"
  click_script="$PLUGIN_DIR/wifi_click.sh"
  updates=on
)

sketchybar --add item wifi right             \
           --set wifi "${wifi_item[@]}"       \
           --subscribe wifi wifi_change system_woke

sketchybar --add bracket wifi_bracket wifi        \
           --set wifi_bracket                     \
             background.color=$BACKGROUND_1       \
             background.border_color=$BACKGROUND_2 \
             background.border_width=2             \
             popup.align=center

# Popup info items
sketchybar --add item wifi.ssid popup.wifi_bracket \
           --set wifi.ssid                         \
             icon="SSID:"                          \
             icon.width=80                         \
             icon.align=left                       \
             label="N/A"                           \
             label.width=140                       \
             label.align=right

sketchybar --add item wifi.ip popup.wifi_bracket \
           --set wifi.ip                         \
             icon="IP:"                          \
             icon.width=80                       \
             icon.align=left                     \
             label="N/A"                         \
             label.width=140                     \
             label.align=right

sketchybar --add item wifi.padding right \
           --set wifi.padding width=5
