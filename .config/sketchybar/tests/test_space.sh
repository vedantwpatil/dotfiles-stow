#!/bin/bash
# Test suite for sketchybar aerospace migration

PASS=0
FAIL=0

assert_eq() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  PASS: $desc"
    PASS=$((PASS+1))
  else
    echo "  FAIL: $desc"
    echo "        expected: $expected"
    echo "        actual:   $actual"
    FAIL=$((FAIL+1))
  fi
}

assert_contains() {
  local desc="$1" pattern="$2" haystack="$3"
  if echo "$haystack" | grep -q "$pattern"; then
    echo "  PASS: $desc"
    PASS=$((PASS+1))
  else
    echo "  FAIL: $desc"
    echo "        pattern '$pattern' not found in output"
    FAIL=$((FAIL+1))
  fi
}

assert_not_contains() {
  local desc="$1" pattern="$2" haystack="$3"
  if echo "$haystack" | grep -q "$pattern"; then
    echo "  FAIL: $desc"
    echo "        pattern '$pattern' should NOT be present"
    FAIL=$((FAIL+1))
  else
    echo "  PASS: $desc"
    PASS=$((PASS+1))
  fi
}

# ---- Setup mock binaries ----
MOCK_DIR=$(mktemp -d)
trap 'rm -rf "$MOCK_DIR"' EXIT

SKETCHYBAR_CALLS="$MOCK_DIR/sketchybar_calls"
AEROSPACE_CALLS="$MOCK_DIR/aerospace_calls"
touch "$SKETCHYBAR_CALLS" "$AEROSPACE_CALLS"

cat > "$MOCK_DIR/sketchybar" <<'EOF'
#!/bin/bash
echo "$@" >> "$SKETCHYBAR_CALLS"
EOF
chmod +x "$MOCK_DIR/sketchybar"

# aerospace mock:
#   list-workspaces --focused  → MOCK_FOCUSED_WORKSPACE (default 1)
#   list-windows --workspace N → MOCK_WINDOWS_<N> lines of output (default empty)
cat > "$MOCK_DIR/aerospace" <<'EOF'
#!/bin/bash
echo "$@" >> "$AEROSPACE_CALLS"
if [ "$1" = "list-workspaces" ] && [ "$2" = "--focused" ]; then
  echo "${MOCK_FOCUSED_WORKSPACE:-1}"
elif [ "$1" = "list-windows" ] && [ "$2" = "--workspace" ]; then
  ws="$3"
  var="MOCK_WINDOWS_${ws}"
  val="${!var}"
  if [ -n "$val" ]; then
    echo "$val"
  fi
fi
EOF
chmod +x "$MOCK_DIR/aerospace"

export PATH="$MOCK_DIR:$PATH"
export SKETCHYBAR_CALLS AEROSPACE_CALLS

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# ============================================================
echo "--- space.sh: update() — focused workspace ---"
# ============================================================

NAME=space.3 SENDER=routine MOCK_FOCUSED_WORKSPACE=3 bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains "focused: drawing=on"       "drawing=on"       "$all_calls"
assert_contains "focused: highlight=true"   "icon.highlight=true" "$all_calls"
assert_contains "focused: label.width=0"    "label.width=0"    "$all_calls"
> "$SKETCHYBAR_CALLS"

# ============================================================
echo "--- space.sh: update() — non-focused with windows ---"
# ============================================================

NAME=space.3 SENDER=routine MOCK_FOCUSED_WORKSPACE=5 MOCK_WINDOWS_3="window1" \
  bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains     "has windows: highlight=false"    "icon.highlight=false"  "$all_calls"
assert_contains     "has windows: label.width=dynamic" "label.width=dynamic" "$all_calls"
assert_not_contains "has windows: no drawing=off"      "drawing=off"          "$all_calls"
> "$SKETCHYBAR_CALLS"

# ============================================================
echo "--- space.sh: update() — non-focused, no windows ---"
# ============================================================

NAME=space.3 SENDER=routine MOCK_FOCUSED_WORKSPACE=5 bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains     "no windows: drawing=off"           "drawing=off"          "$all_calls"
assert_not_contains "no windows: no highlight=true"     "icon.highlight=true"  "$all_calls"
> "$SKETCHYBAR_CALLS"

# ============================================================
echo "--- space.sh: aerospace_workspace_change ---"
# ============================================================

NAME=space.2 SENDER=aerospace_workspace_change FOCUSED_WORKSPACE=2 \
  bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains "matching: drawing=on"       "drawing=on"          "$all_calls"
assert_contains "matching: highlight=true"   "icon.highlight=true" "$all_calls"
assert_contains "matching: label.width=0"    "label.width=0"       "$all_calls"
> "$SKETCHYBAR_CALLS"

NAME=space.2 SENDER=aerospace_workspace_change FOCUSED_WORKSPACE=7 MOCK_WINDOWS_2="window1" \
  bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains     "non-match+windows: drawing=on"       "drawing=on"           "$all_calls"
assert_contains     "non-match+windows: highlight=false"  "icon.highlight=false" "$all_calls"
assert_contains     "non-match+windows: label.width=dynamic" "label.width=dynamic" "$all_calls"
> "$SKETCHYBAR_CALLS"

NAME=space.2 SENDER=aerospace_workspace_change FOCUSED_WORKSPACE=7 \
  bash "$SCRIPT_DIR/plugins/space.sh"
all_calls=$(cat "$SKETCHYBAR_CALLS")
assert_contains     "non-match+no windows: drawing=off"   "drawing=off"          "$all_calls"
assert_not_contains "non-match+no windows: no highlight"  "icon.highlight"       "$all_calls"
> "$SKETCHYBAR_CALLS"

# ============================================================
echo "--- space.sh: mouse.clicked ---"
# ============================================================

NAME=space.4 SENDER=mouse.clicked BUTTON=left bash "$SCRIPT_DIR/plugins/space.sh"
aerospace_call=$(cat "$AEROSPACE_CALLS")
assert_contains "left click calls aerospace workspace 4" "workspace 4" "$aerospace_call"
> "$AEROSPACE_CALLS"

NAME=space.4 SENDER=mouse.clicked BUTTON=right bash "$SCRIPT_DIR/plugins/space.sh"
aerospace_call=$(cat "$AEROSPACE_CALLS")
assert_eq "right click is a no-op (no aerospace call)" "" "$aerospace_call"
> "$AEROSPACE_CALLS"

# ============================================================
echo "--- spaces.sh: item type and properties ---"
# ============================================================

env PLUGIN_DIR="$SCRIPT_DIR/plugins" \
    RED="#ff0000" BACKGROUND_1="#111111" BACKGROUND_2="#222222" \
    bash "$SCRIPT_DIR/items/spaces.sh"

spaces_output=$(cat "$SKETCHYBAR_CALLS")

assert_not_contains "no --add space used"  "\-\-add space"    "$spaces_output"
assert_contains     "--add item used"      "\-\-add item"     "$spaces_output"
assert_not_contains "no associated_space"  "associated_space" "$spaces_output"

for i in $(seq 1 9); do
  assert_contains "item space.$i created" "space\.$i" "$spaces_output"
done

> "$SKETCHYBAR_CALLS"

# ============================================================
echo "--- front_app.sh: no yabai item ---"
# ============================================================

env PLUGIN_DIR="$SCRIPT_DIR/plugins" \
    FONT="Hack Nerd Font" WHITE="#ffffff" ORANGE="#ff8800" \
    YABAI_GRID="" \
    bash "$SCRIPT_DIR/items/front_app.sh"

front_output=$(cat "$SKETCHYBAR_CALLS")

assert_not_contains "no yabai item added"        "add item yabai"          "$front_output"
assert_not_contains "no window_focus event"      "add event window_focus"  "$front_output"
assert_not_contains "no windows_on_spaces event" "add event windows_on_spaces" "$front_output"
assert_contains     "front_app item added"       "add item front_app"      "$front_output"
assert_contains     "front_app subscribes to front_app_switched" "front_app_switched" "$front_output"

> "$SKETCHYBAR_CALLS"

# ============================================================
echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
