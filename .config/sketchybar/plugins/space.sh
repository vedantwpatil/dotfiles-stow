#!/bin/bash

export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin"

SID="${NAME##space.}"

has_windows() {
  [ "$(aerospace list-windows --workspace "$SID" 2>/dev/null | wc -l | tr -d ' ')" -gt 0 ]
}

set_highlight() {
  local focused="$1"
  if [ "$focused" = "true" ]; then
    sketchybar --animate tanh 20 --set $NAME drawing=on icon.highlight=true label.width=0
  else
    sketchybar --animate tanh 20 --set $NAME icon.highlight=false label.width=dynamic
  fi
}

update() {
  FOCUSED=$(aerospace list-workspaces --focused 2>/dev/null)
  if [ "$FOCUSED" = "$SID" ]; then
    set_highlight true
  elif has_windows; then
    set_highlight false
  else
    sketchybar --set $NAME drawing=off
  fi
}

mouse_clicked() {
  if [ "$BUTTON" != "right" ]; then
    aerospace workspace $SID
  fi
}

aerospace_workspace_change() {
  if [ "$FOCUSED_WORKSPACE" = "$SID" ]; then
    set_highlight true
  elif has_windows; then
    sketchybar --set $NAME drawing=on
    set_highlight false
  else
    sketchybar --set $NAME drawing=off
  fi
}

case "$SENDER" in
  "mouse.clicked")              mouse_clicked ;;
  "aerospace_workspace_change") aerospace_workspace_change ;;
  *)                            update ;;
esac
