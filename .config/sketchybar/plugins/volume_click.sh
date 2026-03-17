#!/bin/bash

if [ "$BUTTON" = "right" ]; then
  open /System/Library/PreferencePanes/Sound.prefpane
  exit 0
fi

which SwitchAudioSource >/dev/null || exit 0
source "$HOME/.config/sketchybar/colors.sh"

args=(--remove '/volume.device\.*/' --set volume_bracket popup.drawing=toggle)
COUNTER=0
CURRENT="$(SwitchAudioSource -t output -c)"

while IFS= read -r device; do
  COLOR=$GREY
  if [ "${device}" = "$CURRENT" ]; then
    COLOR=$WHITE
  fi
  args+=(--add item volume.device.$COUNTER popup.volume_bracket           \
         --set volume.device.$COUNTER label="${device}"                   \
                                      label.color="$COLOR"                \
               click_script="SwitchAudioSource -s \"${device}\"          \
                 && sketchybar --set /volume.device\.*/ label.color=$GREY \
                               --set \$NAME label.color=$WHITE            \
                               --set volume_bracket popup.drawing=off")
  COUNTER=$((COUNTER+1))
done <<< "$(SwitchAudioSource -a -t output)"

sketchybar -m "${args[@]}" > /dev/null
