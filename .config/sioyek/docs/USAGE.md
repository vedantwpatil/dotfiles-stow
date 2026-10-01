# Sioyek Usage

Guide to using Sioyek with this config, plus a full keybinding reference.

Setup and preference details: [CONFIG.md](CONFIG.md). Upstream docs: https://sioyek-documentation.readthedocs.io/

Notation: `<C-k>` = Ctrl+k, `<M-k>` = Alt/Option+k, `<S-k>` = Shift+k, `gg` = press `g` twice, `gh` = `g` then `h`. Uppercase letter = Shift + letter. Most movement commands take a numeric prefix: type `5` then the key (for example `150gg` jumps to page 150).

## Setup

Install steps, config file layout, and every preference are in [CONFIG.md](CONFIG.md). Short version: symlink this directory to `~/.config/sioyek` and restart Sioyek.

## How to use Sioyek

Sioyek is a keyboard-driven PDF reader built for papers and books. Core ideas:

- **Visual mark (ruler)**: A highlighted line marks your reading position. Right click a line to place it, then `j`/`k` (or arrow keys) move it line by line. The screen scrolls to follow. Ruler mode is on in this config.
- **Overview and smart jump**: Hover or use `F`/`l` on a citation or reference (`[12]`, "Figure 3", "Theorem 2") to see a popup preview of the target without leaving your place. `]` turns it into a portal, `<C-]>` jumps there.
- **History**: Every jump is recorded. `<backspace>` goes back to where you were, `<S-backspace>` goes forward. Jump freely then return.
- **Portals**: Persistent links between two locations (see Portals below), shown in a second window with `<f12>`.
- **Marks, bookmarks, highlights**: Marks are quick single-letter jump points. Bookmarks are named locations. Highlights are colored text annotations, 26 colors (`a`-`z`).
- **Command line**: `:` opens a prompt where every command below can be run by name.
- **Menus**: Bookmarks, highlights, TOC, and recent documents open searchable lists. Type to filter, arrows to move, Enter to select.

Typical reading flow:

1. `o` or `O` to open a paper.
2. `=` to fit width, `<space>` to page through, or right click + `j`/`k` to read line by line.
3. `F` or `l` on a citation to preview it; `<backspace>` to return.
4. Select text, `h` then a letter to highlight; `b` to bookmark a spot.
5. `/term` to search, `n`/`N` to step through results.

## Keybindings

### Opening and windows

| Key                  | Command                                    | Action                                         |
| -------------------- | ------------------------------------------ | ---------------------------------------------- |
| `o`                  | `open_document`                            | System file dialog                             |
| `<C-o>`, `<M-o>`     | `open_document_embedded`                   | Embedded file browser                          |
| `<C-S-o>`, `<M-S-o>` | `open_document_embedded_from_current_path` | Embedded browser at current file's directory   |
| `O`                  | `open_prev_doc`                            | Searchable list of previously opened documents |
| `<C-t>`, `<M-t>`     | `new_window`                               | New window                                     |
| `<C-w>`, `<M-w>`     | `close_window`                             | Close window                                   |
| `q`                  | `quit`                                     | Quit Sioyek                                    |

### Moving around

| Key                            | Command                             | Action                                                 |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------ |
| `j` / `k`                      | `move_visual_mark_down` / `up`      | Move visual mark down / up one line (needs a mark set) |
| `<down>` / `<up>`              | `move_visual_mark_down` / `up`      | Same as `j` / `k`                                      |
| `<left>`                       | `move_right`                        | Scroll view right (swapped; this is Sioyek's default)  |
| `<right>`                      | `move_left`                         | Scroll view left                                       |
| `<space>`, `<pagedown>`        | `screen_down`                       | Down one screen                                        |
| `<S-space>`, `<pageup>`        | `screen_up`                         | Up one screen                                          |
| `<C-pagedown>`, `<M-pagedown>` | `next_page`                         | Next page                                              |
| `<C-pageup>`, `<M-pageup>`     | `previous_page`                     | Previous page                                          |
| `gg`, `<C-home>`, `<M-home>`   | `goto_beginning`                    | Start of document; with number prefix, that page       |
| `G`, `<end>`                   | `goto_end`                          | End of document                                        |
| `<home>`                       | `goto_page_with_page_number`        | Prompt for page number                                 |
| `^`                            | `goto_left_smart`                   | Left edge of page text, ignoring margins               |
| `$`                            | `goto_right_smart`                  | Right edge of page text, ignoring margins              |
| `zz`                           | `goto_top_of_page;goto_right_smart` | Top-right of page (two-column papers)                  |
| `gc` / `gC`                    | `next_chapter` / `prev_chapter`     | Next / previous chapter                                |
| `t`                            | `goto_toc`                          | Table of contents                                      |
| `<backspace>`, `<C-left>`      | `prev_state`                        | Back in history                                        |
| `<S-backspace>`, `<C-right>`   | `next_state`                        | Forward in history                                     |

### Zoom and display

| Key         | Command                                        | Action                                       |
| ----------- | ---------------------------------------------- | -------------------------------------------- |
| `+`         | `zoom_in`                                      | Zoom in (factor 1.2)                         |
| `-`         | `zoom_out`                                     | Zoom out                                     |
| `=`, `<f9>` | `fit_to_page_width`                            | Fit page width to screen                     |
| `<f10>`     | `fit_to_page_width_smart`                      | Fit width ignoring margins                   |
| `r` / `R`   | `rotate_clockwise` / `rotate_counterclockwise` | Rotate                                       |
| `<f8>`      | `toggle_dark_mode`                             | Inverted colors (enabled at startup)         |
| `<f11>`     | `toggle_fullscreen`                            | Fullscreen                                   |
| `<f5>`      | `toggle_presentation_mode`                     | Presentation mode (one page per screen)      |
| `<f7>`      | `toggle_visual_scroll`                         | Wheel moves visual mark instead of scrolling |
| `<f6>`      | `toggle_mouse_drag_mode`                       | Drag pans instead of selecting text          |
| `<f1>`      | `toggle_highlight`                             | Toggle PDF link highlighting                 |

### Search

| Key                      | Command          | Action                       |
| ------------------------ | ---------------- | ---------------------------- |
| `/`, `<C-f>`, `<M-f>`    | `search`         | Search document              |
| `c/`, `c<C-f>`, `c<M-f>` | `chapter_search` | Search current chapter       |
| `n`                      | `next_item`      | Next result (`15n` skips 15) |
| `N`                      | `previous_item`  | Previous result              |

Limit to a page range: `/<110,135>term`.

### Bookmarks

| Key  | Command           | Action                          |
| ---- | ----------------- | ------------------------------- |
| `b`  | `add_bookmark`    | Add bookmark (prompts for text) |
| `db` | `delete_bookmark` | Delete bookmark                 |
| `gb` | `goto_bookmark`   | Bookmarks in this document      |
| `gB` | `goto_bookmark_g` | Bookmarks across all documents  |

### Highlights

Select text (mouse, or `v` for keyboard), then press `h` and a letter `a`-`z`. Colors per letter are in `prefs_user.config`.

| Key          | Command               | Action                                 |
| ------------ | --------------------- | -------------------------------------- |
| `h` + letter | `add_highlight`       | Highlight selection                    |
| `dh`         | `delete_highlight`    | Delete highlight (left click it first) |
| `gh`         | `goto_highlight`      | Highlights in this document            |
| `gH`         | `goto_highlight_g`    | Highlights across all documents        |
| `gnh`        | `goto_next_highlight` | Next highlight                         |
| `gNh`        | `goto_prev_highlight` | Previous highlight                     |

### Marks

| Key                         | Command     | Action                |
| --------------------------- | ----------- | --------------------- |
| `m` + letter (`a-z`, `A-Z`) | `set_mark`  | Mark current location |
| `` ` `` + letter            | `goto_mark` | Jump to mark          |

### Portals

Portals link two locations, for example a citation and its reference entry.

1. Press `p` at the source.
2. Navigate to the destination and press `p` again.

| Key            | Command                       | Action                                                  |
| -------------- | ----------------------------- | ------------------------------------------------------- |
| `p`            | `portal`                      | Start portal / finish portal                            |
| `gp`, `<tab>`  | `goto_portal`                 | Follow nearest portal                                   |
| `P`, `<S-tab>` | `edit_portal`                 | Follow portal; on `prev_state`, updates its destination |
| `dp`           | `delete_portal`               | Delete nearest portal                                   |
| `<f12>`        | `toggle_window_configuration` | Open/close portal helper window                         |

### Links, selection, definitions

| Key              | Command                | Action                                        |
| ---------------- | ---------------------- | --------------------------------------------- |
| `f`              | `open_link`            | Open PDF link via on-screen hint letters      |
| `F`              | `keyboard_smart_jump`  | Smart jump (citation/figure) via hint letters |
| `v`              | `keyboard_select`      | Select text via hint letters                  |
| `l`              | `overview_definition`  | Popup preview of definition at visual mark    |
| `]`              | `portal_to_definition` | Portal to that definition                     |
| `<C-]>`, `<M-]>` | `goto_definition`      | Jump to that definition                       |
| `<f4>`           | `toggle_synctex`       | Right click opens LaTeX source at that spot   |

### Clipboard, search engines, commands

| Key              | Command           | Action                                            |
| ---------------- | ----------------- | ------------------------------------------------- |
| `<C-c>`, `<M-c>` | `copy`            | Copy selection                                    |
| `s`              | `external_search` | Search selection online, then press engine letter |
| `:`              | `command`         | Command prompt                                    |

External search engines (`prefs_user.config`):

| Letter | Engine                                 |
| ------ | -------------------------------------- |
| `s`    | Google Scholar (middle click)          |
| `l`    | Library Genesis (shift + middle click) |
| `g`    | Google                                 |

## Unbound commands

Available via `:` but with no key. Bind in `keys_user.config` as `command <key>`.

| Command                                                                                                                                                 | Action                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `goto_left`, `goto_right`, `goto_top_of_page`, `goto_bottom_of_page`                                                                                    | Go to page edge (non-smart)             |
| `fit_to_page_height`, `fit_to_page_height_smart`, `fit_to_page_width_ratio`                                                                             | Other fit modes                         |
| `zoom_in_cursor`, `zoom_out_cursor`                                                                                                                     | Zoom on mouse cursor                    |
| `goto_window`, `toggle_one_window`                                                                                                                      | Window switching / helper window        |
| `open_last_document`                                                                                                                                    | Toggle between last two documents       |
| `enter_visual_mark_mode`, `close_visual_mark`                                                                                                           | Enter / exit visual mark by keyboard    |
| `toggle_horizontal_scroll_lock`                                                                                                                         | Lock horizontal scroll (touchpads)      |
| `set_select_highlight_type`, `add_highlight_with_current_type`, `toggle_select_highlight`, `goto_next_highlight_of_type`, `goto_prev_highlight_of_type` | Highlight-type workflows                |
| `toggle_custom_color`                                                                                                                                   | Custom text/background colors           |
| `synctex_under_cursor`                                                                                                                                  | Synctex at mouse position               |
| `open_selected_url`                                                                                                                                     | Open selected text as URL               |
| `keyboard_overview`, `next_preview`, `previous_preview`, `goto_overview`, `portal_to_overview`, `overview_under_cursor`, `close_overview`               | Overview popup control                  |
| `smart_jump_under_cursor`, `visual_mark_under_cursor`, `goto_selected_text`, `focus_text`                                                               | Jump / mark helpers                     |
| `import`, `export`, `embed_annotations`                                                                                                                 | Move data, write annotations into a PDF |
| `execute`, `execute_predefined_command`                                                                                                                 | Run shell commands                      |
| `copy_window_size_config`                                                                                                                               | Copy window size as config              |
| `prefs`, `prefs_user`, `prefs_user_all`, `keys`, `keys_user`, `keys_user_all`                                                                           | Open config files                       |
| `enter_password`, `toggle_fastread`, `toggle_statusbar`, `toggle_titlebar`, `reload`                                                                    | Misc                                    |
| `set_status_string`, `clear_status_string`                                                                                                              | Status bar text (extensions)            |

## Customizing

Binding syntax, custom shell commands, and all preferences are in [CONFIG.md](CONFIG.md).
