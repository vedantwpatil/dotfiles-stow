# Sioyek Config

How to install this config and change it. For day-to-day use and keybindings, see [USAGE.md](USAGE.md).

## Files

| File | Purpose |
| --- | --- |
| `keys_user.config` | Keybindings. Each line is `command key`. |
| `prefs_user.config` | Appearance and behavior settings, `setting value` per line. |
| `docs/` | This documentation. |

Sioyek loads its built-in defaults first, then applies these user files on top. Anything not set here keeps its default.

## Install

1. Install Sioyek (macOS: `brew install --cask sioyek`, or download from https://github.com/ahrm/sioyek/releases).
2. Place this directory at `~/.config/sioyek/`. If it lives in a dotfiles repo, symlink it:

   ```sh
   ln -s ~/dotfiles/.config/sioyek ~/.config/sioyek
   ```

3. Start Sioyek. It opens in dark mode because of `startup_commands toggle_dark_mode`.

Check which files Sioyek loaded by running `:prefs_user_all` and `:keys_user_all` from the command prompt (`:`).

## Applying changes

Restart Sioyek, or run `:reload`. If a binding conflicts with a default, Sioyek warns about it (`should_warn_about_user_key_override 1`).

## Keybindings

Edit `keys_user.config`. Syntax:

```
command_name        k          # k
command_name        <C-k>      # Ctrl+k
command_name        <M-k>      # Alt/Option+k
command_name        K          # Shift+k
command_name        gt         # g then t
cmd_one;cmd_two     <f2>       # run both commands
```

Full list of commands and current bindings: [USAGE.md](USAGE.md#keybindings).

Custom shell commands: define in `prefs_user.config`, then bind in `keys_user.config`.

```
# prefs_user.config
new_command   _open_in_editor   nvim %{file_name}

# keys_user.config
_open_in_editor   <f2>
```

## Preferences

Edit `prefs_user.config`. Colors are RGB floats from 0 to 1 (`0.12 0.12 0.16`). Settings in use:

### Startup and behavior

| Setting | Value | Effect |
| --- | --- | --- |
| `startup_commands` | `toggle_dark_mode` | Commands run at launch |
| `check_for_updates_on_startup` | `0` | No update check |
| `use_legacy_keybinds` | `0` | Use current keybinding scheme |
| `ruler_mode` | `1` | Visual mark shown as ruler line |
| `ruler_padding`, `ruler_x_padding` | `1.0`, `5.0` | Ruler size around the line |
| `zoom_inc_factor` | `1.2` | Zoom step for `+` / `-` |
| `vertical_move_amount`, `horizontal_move_amount` | `1.0` | Scroll step size |
| `move_screen_ratio` | `0.5` | Fraction of screen moved by `screen_down`/`screen_up` |
| `fit_to_page_width_ratio` | `0.75` | Screen width used by `fit_to_page_width_ratio` |
| `flat_toc`, `collapsed_toc` | `0` | Nested, expanded table of contents |
| `create_table_of_contents_if_not_exists`, `max_created_toc_size` | `1`, `5000` | Auto-generate a TOC when a PDF has none |
| `sort_bookmarks_by_location` | `1` | Bookmarks ordered by position |
| `wheel_zoom_on_cursor` | `0` | Ctrl+wheel zooms at screen center |
| `single_click_selects_words` | `0` | Single click does not select a word |
| `multiline_menus` | `1` | Menu entries wrap to multiple lines |
| `should_launch_new_instance`, `should_launch_new_window` | `0` | Reuse existing window |
| `should_use_multiple_monitors` | `0` | Single monitor |
| `should_load_tutorial_when_no_other_file` | `1` | Open tutorial when launched with no file |

### Search engines

```
search_url_s   https://scholar.google.com/scholar?q=
search_url_l   http://gen.lib.rus.ec/scimag/?q=
search_url_g   https://www.google.com/search?q=
middle_click_search_engine          s
shift_middle_click_search_engine    l
```

`search_url_<letter>` adds an engine for any letter `a`-`z`. Use it with `s` then that letter on selected text.

### Colors

Palette is Kanagawa Paper Ink. Each color line has a comment naming its source color.

| Setting | Used for |
| --- | --- |
| `background_color`, `dark_mode_background_color` | Page background |
| `dark_mode_contrast` | Contrast in dark mode (`0.85`) |
| `text_highlight_color` | Selected text |
| `visual_mark_color` | Ruler / visual mark |
| `search_highlight_color` | Search matches |
| `link_highlight_color` | PDF links |
| `synctex_highlight_color` | Synctex target |
| `status_bar_color`, `status_bar_text_color`, `status_bar_font_size` | Status bar |
| `page_separator_width`, `page_separator_color` | Gap between pages |
| `highlight_color_a` ... `highlight_color_z` | 26 highlight types, used by `h` + letter |

Each highlight letter has a distinct RGB value. Keep them distinct if you edit them, or two letters will look identical.

## Reference

- Sioyek docs: https://sioyek-documentation.readthedocs.io/
- Default files for comparison: `/Applications/sioyek.app/Contents/Resources/keys.config` and `prefs.config`.
