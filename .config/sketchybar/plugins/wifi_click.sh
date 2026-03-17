#!/bin/bash

DRAWING=$(sketchybar --query wifi_bracket | jq -r '.popup.drawing')

if [ "$DRAWING" = "off" ]; then
  SSID=$(ipconfig getsummary en0 2>/dev/null | awk -F ' SSID : ' '/ SSID : / {print $2}')
  IP=$(ipconfig getifaddr en0 2>/dev/null)
  [ -z "$SSID" ] && SSID="Not connected"
  [ -z "$IP" ]   && IP="N/A"

  sketchybar --set wifi.ssid label="$SSID" \
             --set wifi.ip   label="$IP"   \
             --set wifi_bracket popup.drawing=on
else
  sketchybar --set wifi_bracket popup.drawing=off
fi
