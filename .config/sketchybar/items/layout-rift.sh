#!/bin/bash

# shows rift's active workspace layout-engine mode (config.toml: [keys]
# Alt+Ctrl+1..6 -> set_workspace_layout). See ../plugins/layout-rift.sh and
# ../../rift/config.toml's run_on_start (layout_changed subscription).

sketchybar --add event rift_layout_changed

layout_rift=(
  icon.drawing=off
  label.color=$WHITE
  script="$PLUGIN_DIR/layout-rift.sh"
  associated_display=active
)

sketchybar --add item layout_rift left            \
           --set layout_rift "${layout_rift[@]}"  \
           --subscribe layout_rift rift_workspace_changed \
                                   rift_layout_changed
