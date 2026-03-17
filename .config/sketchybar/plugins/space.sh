#!/bin/bash

export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin"

source "$HOME/.config/sketchybar/colors.sh"

SID="${NAME##space.}"
PLUGIN_DIR="${PLUGIN_DIR:-$HOME/.config/sketchybar/plugins}"

has_windows() {
  [ "$(aerospace list-windows --workspace "$SID" 2>/dev/null | wc -l | tr -d ' ')" -gt 0 ]
}

get_space_icons() {
  local icons=""
  while IFS= read -r app; do
    [ -z "$app" ] && continue
    icons="${icons}$(bash "$PLUGIN_DIR/icon_map.sh" "$app")"
  done < <(aerospace list-windows --workspace "$SID" 2>/dev/null \
           | awk -F ' [|] ' '{print $3}' | sort -u)
  echo "$icons"
}

set_highlight() {
  local focused="$1"
  if [ "$focused" = "true" ]; then
    sketchybar --animate tanh 20 --set "$NAME" drawing=on icon.highlight=true label.width=0
    sketchybar --set "space.bracket.$SID" background.border_color=$GREY
  else
    local icons
    icons=$(get_space_icons)
    sketchybar --animate tanh 20 --set "$NAME" \
      icon.highlight=false label="$icons" label.width=dynamic
    sketchybar --set "space.bracket.$SID" background.border_color=$BACKGROUND_2
  fi
}

update() {
  local FOCUSED
  FOCUSED=$(aerospace list-workspaces --focused 2>/dev/null)
  if [ "$FOCUSED" = "$SID" ]; then
    set_highlight true
  elif has_windows; then
    set_highlight false
  else
    sketchybar --set "$NAME" drawing=off
  fi
}

mouse_clicked() {
  [ "$BUTTON" != "right" ] && aerospace workspace "$SID"
}

aerospace_workspace_change() {
  if [ "$FOCUSED_WORKSPACE" = "$SID" ]; then
    set_highlight true
  elif has_windows; then
    sketchybar --set "$NAME" drawing=on
    set_highlight false
  else
    sketchybar --set "$NAME" drawing=off
  fi
}

case "$SENDER" in
  "mouse.clicked")              mouse_clicked ;;
  "aerospace_workspace_change") aerospace_workspace_change ;;
  *)                            update ;;
esac
