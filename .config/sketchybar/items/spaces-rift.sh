#!/bin/bash

# rift virtual-workspace variant of spaces.sh — see space-rift.sh (plugin) and
# ../../docs/rift.md#sketchybar for how this differs from the yabai version.
# Default item count only — more are added on demand by
# plugins/space-rift.sh's reconcile_new_workspaces() once rift reports more
# workspaces than this (Alt+Shift+C / the `>` separator to create one).
WORKSPACE_NAMES=("1" "2" "3" "4" "5")

# Switch workspace on left click. No right-click destroy: rift has no
# destroy-workspace command (unlike yabai's `space --destroy`).

sketchybar --add event rift_workspace_changed

for i in "${!WORKSPACE_NAMES[@]}"; do
  space=(
    icon=${WORKSPACE_NAMES[i]}
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
    script="$PLUGIN_DIR/space-rift.sh"
  )

  sketchybar --add item space_rift.$i left \
    --set space_rift.$i "${space[@]}" \
    --subscribe space_rift.$i mouse.clicked \
    rift_workspace_changed
done

spaces_rift=(
  background.color=$BACKGROUND_1
  background.border_color=$BACKGROUND_2
  background.border_width=2
  background.drawing=on
)

separator_rift=(
  icon=􀆊
  icon.font="$FONT:Heavy:16.0"
  padding_left=15
  padding_right=15
  label.drawing=off
  associated_display=active
  click_script='rift-cli execute workspace create'
  icon.color=$WHITE
)

sketchybar --add bracket spaces_rift '/space_rift\..*/' \
  --set spaces_rift "${spaces_rift[@]}" \
  \
  --add item separator_rift left \
  --set separator_rift "${separator_rift[@]}"
