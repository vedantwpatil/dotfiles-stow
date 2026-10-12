#!/bin/bash

# Equalize tile sizes on one display's active workspace (yabai: space --balance).
# rift has no balance command and only equalizes on window insert, so this
# round-trips the workspace through a different layout mode: switching modes
# rebuilds the tree from window order with every weight reset. Side effect:
# bsp nesting is rebuilt from scratch, so custom splits are lost.
#
# usage: rebalance.sh [focused | left | right | up | down | <index> | <uuid>]
#   default is the focused display; <index> is 0-based, as in
#   `rift-cli execute display focus --index`. Another display is focused for
#   the run, then focus returns to the display you started on.

# rift's exec hotkeys run with a minimal PATH
export PATH="$HOME/.cargo/bin:/opt/homebrew/bin:$PATH"

sel="${1:-focused}"

active_display() {
  rift-cli query displays | jq -r '.[] | select(.is_active_context) | .uuid'
}

origin=$(active_display)
[ -n "$origin" ] || { echo "rebalance: rift not reachable" >&2; exit 1; }

case "$sel" in
  focused)          ;;
  left|right|up|down) rift-cli execute display focus --direction "$sel" >/dev/null ;;
  *[!0-9]*)         rift-cli execute display focus --uuid "$sel" >/dev/null ;;
  *)                rift-cli execute display focus --index "$sel" >/dev/null ;;
esac

read -r ws mode < <(rift-cli query layout | jq -r '[.workspace_id, .mode] | @tsv')

case "$mode" in
  traditional) via=bsp ;;
  bsp|master_stack|scrolling) via=traditional ;;
  *) echo "rebalance: nothing to balance in $mode layout" >&2; via= ;;
esac

if [ -n "$via" ]; then
  rift-cli execute workspace set-layout "$via" --workspace-id "$ws" >/dev/null
  rift-cli execute workspace set-layout "$mode" --workspace-id "$ws" >/dev/null
fi

[ "$(active_display)" = "$origin" ] || rift-cli execute display focus --uuid "$origin" >/dev/null
