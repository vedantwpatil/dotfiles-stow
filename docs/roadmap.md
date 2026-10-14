# Roadmap / decision log

## Back to yabai (2026-10-13)

Rift trial ([rift.md](rift.md)) dropped: too buggy. yabai + skhd live again.

- `rift service stop` + `rift service uninstall`; removed
  `Library/LaunchAgents/git.acsandmann.rift.plist` from the repo (otherwise
  the stow hook re-links it and rift autostarts next login).
- `launchctl enable gui/$UID/com.asmvik.yabai` — the label had been left
  disabled, so `yabai --start-service` alone could not bootstrap it.
- `sketchybarrc` sources `spaces.sh` again; `spaces-rift.sh` /
  `layout-rift.sh` kept in the tree, unsourced.
- Rift binary, `.config/rift/`, Brewfile entry untouched.

**Open:** `/private/etc/sudoers.d/yabai` pins the sha256 of an older yabai
binary, so `sudo yabai --load-sa` in `yabairc` fails until it is
regenerated (needed after every yabai upgrade). Without the scripting
addition `space --focus/--create`, `window --space` and the `space=5` rules
do not work.

## Stow auto-symlink hook (2026-07-30)

`.githooks/{post-commit,post-merge,post-checkout}` all run `stow -R -t ~ .`
so any new folder dropped into the repo gets symlinked into place without
a manual `stow .` afterward.

- Enabled via `git config core.hooksPath .githooks` (repo-local, **not**
  versioned by git itself — re-run that command after a fresh clone).
- `git restore --staged` also fires `post-checkout` (git implements it via
  the checkout machinery) — expected, harmless.
- Any config folder stow can't cleanly symlink (real file already exists
  at target, differs from repo) will abort the whole restow with a
  `WARNING! stowing . would cause conflicts` message. When that happens,
  either resolve the drift (see below) or add a `--ignore=/name$` line to
  `.stowrc` to exclude that one config until it's sorted.

## sketchybar: yabai vs aerospace drift (2026-07-30)

Found live `~/.config/sketchybar` had silently diverged from the repo:
live was still the original yabai-based config (byte-identical to commit
`58a0ba9`), while the repo had since moved through an aerospace-based
rewrite (commits `d1a66b4`..`b3d7b1e`) plus a Paper Ink color re-theme
(`eb6d6cb`). Decision: keep yabai (that's the WM actually in use), keep
the Paper Ink colors. Repo scripts reverted to the `58a0ba9` versions;
`colors.sh` kept at the Paper Ink palette. `~/.config/sketchybar` is now
a plain stow symlink into the repo again.

**Dropped in the process** (existed only in the aerospace-era repo, never
made it live, not reintroduced): `items/wifi.sh`, `plugins/wifi.sh`,
`plugins/wifi_click.sh`, `tests/test_space.sh`, a `.claude` sketchybar
subfolder. Nothing is lost — full content is still reachable via
`git show b3d7b1e:.config/sketchybar/<path>`.

**Open question:** was the aerospace rewrite an active migration-in-progress
or an abandoned experiment? If migrating to aerospace for real later,
those dropped files are the starting point to resurrect.
