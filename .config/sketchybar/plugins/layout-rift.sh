#!/bin/bash

# Re-queries rift directly on every trigger instead of trusting
# rift-cli subscribe's layout_changed event payload fields (undocumented) —
# reuses only .name/.is_active from `query workspaces`, same fields
# space-rift.sh already relies on.

label_for() {
  case "$1" in
    traditional)  echo "Traditional" ;;
    bsp)          echo "BSP" ;;
    stack)        echo "Stack" ;;
    master_stack) echo "Master-Stack" ;;
    scrolling)    echo "Scrolling" ;;
    floating)     echo "Floating" ;;
    *)            echo "$1" ;;
  esac
}

active_name=$(rift-cli query workspaces 2>/dev/null | jq -r '.[] | select(.is_active) | .name' | head -n1)
active_idx=$(( ${active_name:-1} - 1 ))

mode=$(rift-cli query workspace-layout --workspace-id "$active_idx" 2>/dev/null \
         | jq -r 'if type=="array" then (.[0].layout_mode // empty) else (.layout_mode // empty) end')

[ -n "$mode" ] && sketchybar --set "$NAME" label="$(label_for "$mode")"
