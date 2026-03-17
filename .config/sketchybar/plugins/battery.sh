#!/bin/bash

source "$HOME/.config/sketchybar/icons.sh"
source "$HOME/.config/sketchybar/colors.sh"

BATT_INFO=$(pmset -g batt)
PERCENTAGE=$(echo "$BATT_INFO" | grep -Eo "\d+%" | cut -d% -f1)
CHARGING=$(echo "$BATT_INFO" | grep 'AC Power')

if [ -z "$PERCENTAGE" ]; then
  exit 0
fi

COLOR=$WHITE
case ${PERCENTAGE} in
  9[0-9]|100) ICON=$BATTERY_100; COLOR=$GREEN  ;;
  [6-8][0-9])  ICON=$BATTERY_75;  COLOR=$GREEN  ;;
  [3-5][0-9])  ICON=$BATTERY_50;  COLOR=$WHITE  ;;
  [1-2][0-9])  ICON=$BATTERY_25;  COLOR=$ORANGE ;;
  *)            ICON=$BATTERY_0;   COLOR=$RED    ;;
esac

LEAD=""
[ "$PERCENTAGE" -lt 10 ] 2>/dev/null && LEAD="0"

[[ -n "$CHARGING" ]] && ICON=$BATTERY_CHARGING

if [ "$SENDER" = "mouse.clicked" ]; then
  sketchybar --set battery popup.drawing=toggle
  REMAINING=$(echo "$BATT_INFO" | awk '/ remaining;/ {print $5}')
  if [ -z "$REMAINING" ] || [ "$REMAINING" = "0:00" ]; then
    LABEL="No estimate"
  else
    LABEL="${REMAINING}h"
  fi
  sketchybar --set battery.time label="$LABEL"
else
  sketchybar --set "$NAME" icon="$ICON" icon.color=$COLOR label="${LEAD}${PERCENTAGE}%"
fi
