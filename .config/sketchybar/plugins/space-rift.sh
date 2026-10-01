#!/bin/bash

# rift virtual-workspace variant of space.sh.
# $NAME is "space_rift.<index>" (0-based, matches config.toml's
# workspace_names index and `rift-cli execute workspace switch <index>`).
IDX="${NAME#space_rift.}"
WS_NAME=$((IDX + 1))

# items/spaces-rift.sh only pre-creates DEFAULT_WORKSPACE_COUNT items at
# startup; new workspaces made past that (Alt+Shift+C / the `>` separator)
# have no sketchybar item yet. Reconciled here rather than on a dedicated
# rift event, since rift has none for workspace creation — only run from
# space_rift.0 (always exists) so N item-processes don't race each other.
reconcile_new_workspaces() {
  [ "$NAME" = "space_rift.0" ] || return
  local count
  count=$(rift-cli query workspaces 2>/dev/null | jq 'length' 2>/dev/null)
  [ -z "$count" ] && return

  source "$HOME/.config/sketchybar/colors.sh"
  local i
  for ((i = 0; i < count; i++)); do
    sketchybar --query "space_rift.$i" >/dev/null 2>&1 && continue
    local item=(
      icon=$((i + 1))
      icon.padding_left=10
      icon.padding_right=15
      padding_left=2
      padding_right=2
      label.padding_right=20
      icon.highlight_color=$RED
      label.font="sketchybar-app-font:Regular:16.0"
      label.background.height=26
      label.background.drawing=on
      label.background.color=$BACKGROUND_2
      label.background.corner_radius=8
      label.drawing=off
      script="$HOME/.config/sketchybar/plugins/space-rift.sh"
    )
    sketchybar --add item "space_rift.$i" left                        \
               --set "space_rift.$i" "${item[@]}"                     \
               --subscribe "space_rift.$i" mouse.clicked rift_workspace_changed \
               --add bracket spaces_rift "space_rift.$i"
  done
}
reconcile_new_workspaces

set_highlight() {
  local selected="$1"
  local WIDTH="dynamic"
  if [ "$selected" = "true" ]; then
    WIDTH="0"
  fi
  sketchybar --animate tanh 20 --set "$NAME" icon.highlight="$selected" label.width="$WIDTH"
}

# Triggered by rift itself: config.toml's run_on_start subscribes to rift's
# workspace_changed event and re-triggers this as a sketchybar event,
# passing the newly active workspace's name as $RIFT_WORKSPACE_NAME.
on_workspace_changed() {
  if [ "$RIFT_WORKSPACE_NAME" = "$WS_NAME" ]; then
    set_highlight "true"
  else
    set_highlight "false"
  fi
}

# Fallback for initial paint (sketchybar --update at startup) when no
# workspace_changed event has fired yet: ask rift directly.
query_and_update() {
  local active
  active=$(rift-cli query workspaces 2>/dev/null | jq -r --arg n "$WS_NAME" '.[] | select(.name==$n) | .is_active')
  set_highlight "${active:-false}"
}

mouse_clicked() {
  rift-cli execute workspace switch "$IDX" >/dev/null 2>&1 &
}

case "$SENDER" in
  "mouse.clicked") mouse_clicked ;;
  "rift_workspace_changed") on_workspace_changed ;;
  *) query_and_update ;;
esac
