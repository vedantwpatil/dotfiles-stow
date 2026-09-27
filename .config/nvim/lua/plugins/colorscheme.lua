-- kanagawa-paper ink, driven by the extended palette in
-- lua/kanagawa-paper-ink-extended.lua. Roles feed kanagawa-paper's theme table
-- (colors.theme.ink); groups the plugin doesn't derive from it are set in `overrides`.

local function roles()
  return require("kanagawa-paper-ink-extended").roles
end

-- Map extended roles onto kanagawa-paper's ink theme table.
-- Left unset on purpose: ui.bg_gutter follows chrome.gutter_bg (nil = "none"),
-- syn.variable and ui.pmenu.fg_sel stay "none" so highlights pass through.
local function ink_theme()
  local r = roles()
  local s, t, b, st, m, a = r.surface, r.text, r.border, r.state, r.modes, r.accent
  local c, sy, d, df, g, tm = r.chrome, r.syntax, r.diag, r.diff, r.git, r.terminal

  return {
    modes = {
      normal = m.normal,
      insert = m.insert,
      visual = m.visual,
      replace = m.replace,
      command = m.command,
    },
    ui = {
      fg = t.fg,
      fg_dim = t.fg_dim,
      fg_dimmer = t.fg_dimmer,
      fg_dark = t.fg_dark,
      fg_reverse = t.fg_reverse,
      bg_m4 = s.bg_m4,
      bg_m3 = s.bg_m3,
      bg_m2 = s.bg_m2,
      bg_m1 = s.bg_m1,
      bg_dim = s.bg_m2,
      bg = s.bg,
      bg_p1 = s.bg_p1,
      bg_p2 = s.bg_p2,
      bg_gutter = c.gutter_bg or "none",
      bg_cursorline = st.cursorline,
      bg_cursorline_alt = st.cursorline_alt,
      bg_search = st.search,
      bg_visual = st.selection,
      bg_statusline = c.statusline_bg,
      border = b.border,
      header1 = c.header1,
      header2 = c.header2,
      special = c.special_key,
      nontext = c.nontext,
      whitespace = c.whitespace,
      win_separator = b.win_separator,
      indent = b.indent,
      indent_scope = b.indent_scope,
      picker = a.secondary,
      yank = st.yank,
      mark = st.mark,
      scrollbar = st.scrollbar,
      tabline = {
        bg = c.tabline_bg,
        fg_selected = c.tab_active_fg,
        bg_selected = c.tab_active_bg,
        fg_inactive = c.tab_inactive_fg,
        bg_inactive = c.tab_inactive_bg,
        fg_alternate = c.tab_alternate_fg,
        bg_alternate = c.tabline_bg,
        indicator = c.tab_indicator,
      },
      pmenu = {
        fg = c.pmenu_fg,
        fg_border = c.float_border,
        bg_border = c.pmenu_bg,
        bg = c.pmenu_bg,
        bg_sel = c.pmenu_sel_bg,
        bg_sbar = c.pmenu_bg,
        bg_thumb = c.pmenu_thumb,
      },
      float = {
        fg = c.float_fg,
        bg = c.float_bg,
        fg_border = c.float_border,
        bg_border = c.float_bg,
      },
    },
    accent = {
      accent1 = a.accent1,
      accent2 = a.accent2,
      accent3 = a.accent3,
      accent4 = a.accent4,
      accent5 = a.accent5,
      invert = a.invert,
    },
    rainbow = {
      rainbow1 = r.rainbow.rainbow1,
      rainbow2 = r.rainbow.rainbow2,
      rainbow3 = r.rainbow.rainbow3,
      rainbow4 = r.rainbow.rainbow4,
      rainbow5 = r.rainbow.rainbow5,
      rainbow6 = r.rainbow.rainbow6,
      rainbow7 = r.rainbow.rainbow7,
    },
    syn = {
      attribute = sy.attribute,
      comment = sy.comment,
      docstring = sy.docstring,
      constant = sy.constant,
      deprecated = sy.deprecated,
      fun = sy["function"],
      identifier = sy.identifier,
      keyword = sy.keyword,
      member = sy.member,
      number = sy.number,
      operator = sy.operator,
      parameter = sy.parameter,
      preproc = sy.preproc,
      punct = sy.punctuation,
      regex = sy.regex,
      statement = sy.statement,
      string = sy.string,
      symbol = sy.symbol,
      type = sy.type,
      special1 = sy.special1,
      special2 = sy.special2,
      special3 = sy.special3,
    },
    vcs = {
      added = g.added,
      added_light = df.add_bg,
      removed = g.deleted,
      removed_light = df.delete_bg,
      changed = g.modified,
      changed_light = df.change_bg,
    },
    diff = {
      add = df.add,
      add_light = df.add_bg,
      delete = df.delete,
      delete_light = df.delete_bg,
      change = df.change,
      change_light = df.change_bg,
      text = df.text,
      text_light = df.text_bg,
      conflict_ours = df.conflict_ours,
      conflict_theirs = df.conflict_theirs,
      conflict_ancestor = df.conflict_ancestor,
    },
    diag = {
      ok = d.ok,
      ok_light = d.ok_bg,
      error = d.error,
      error_light = d.error_bg,
      warning = d.warning,
      warning_light = d.warning_bg,
      info = d.info,
      info_light = d.info_bg,
      hint = d.hint,
      hint_light = d.hint_bg,
    },
    term = {
      black = tm.black,
      red = tm.red,
      green = tm.green,
      yellow = tm.yellow,
      blue = tm.blue,
      magenta = tm.magenta,
      cyan = tm.cyan,
      white = tm.white,
      black_bright = tm.bright_black,
      red_bright = tm.bright_red,
      green_bright = tm.bright_green,
      yellow_bright = tm.bright_yellow,
      blue_bright = tm.bright_blue,
      magenta_bright = tm.bright_magenta,
      cyan_bright = tm.bright_cyan,
      white_bright = tm.bright_white,
      indexed1 = tm.color16,
      indexed2 = tm.color17,
    },
  }
end

-- Highlight groups kanagawa-paper doesn't derive from the theme table.
local function overrides()
  local r = roles()
  local t, st, c, sy, df, mk = r.text, r.state, r.chrome, r.syntax, r.diff, r.markup

  local groups = {
    -- Search: current match on the bright tint, other matches on the muted one
    Search = { fg = t.fg, bg = st.search_other },
    IncSearch = { fg = t.fg_reverse, bg = st.search },
    CurSearch = { fg = t.fg_dark, bg = st.search_current, bold = true },
    VisualNOS = { bg = st.selection_inactive },

    -- Completion menu
    PmenuKind = { fg = c.pmenu_kind, bg = c.pmenu_bg },
    PmenuKindSel = { fg = c.pmenu_kind, bg = c.pmenu_sel_bg },
    PmenuExtra = { fg = c.pmenu_extra, bg = c.pmenu_bg },
    PmenuExtraSel = { fg = c.pmenu_extra, bg = c.pmenu_sel_bg },
    PmenuMatch = { fg = c.pmenu_match },
    PmenuMatchSel = { fg = c.pmenu_match },

    DiffText = { fg = df.text, bg = df.text_bg, bold = true },

    DiagnosticDeprecated = { fg = sy.deprecated, sp = sy.deprecated, strikethrough = true },
    DiagnosticUnnecessary = { fg = sy.unused },

    ["@module"] = { fg = sy.namespace },
    ["@string.documentation"] = { fg = sy.docstring, italic = true },

    -- Markup
    ["@markup.list"] = { fg = mk.list_marker },
    RenderMarkdownBullet = { fg = mk.list_marker },
    RenderMarkdownChecked = { fg = mk.checkbox_done },
    RenderMarkdownUnchecked = { fg = mk.checkbox_todo },
    RenderMarkdownDash = { fg = mk.rule },
    RenderMarkdownTableHead = { fg = mk.table_header, bold = true },
    RenderMarkdownHint = { fg = mk.important }, -- [!IMPORTANT] callout
  }

  for i = 1, 6 do
    groups["RenderMarkdownH" .. i .. "Bg"] = { fg = mk["h" .. i], bg = mk["h" .. i .. "_bg"], bold = true }
  end

  -- Completion kind colors (blink.cmp: BlinkCmpKind<Name>)
  for kind, fg in pairs(r.kinds) do
    groups["BlinkCmpKind" .. kind] = { fg = fg }
  end

  return groups
end

return {
  {
    "thesimonho/kanagawa-paper.nvim",
    lazy = false,
    priority = 1000,
    opts = function()
      return {
        transparent = true,
        colors = { theme = { ink = ink_theme() } },
        overrides = overrides,
      }
    end,
    config = function(_, opts)
      require("kanagawa-paper").setup(opts)
      vim.cmd("colorscheme kanagawa-paper-ink")

      -- kanagawa-paper only sets these on its cached path, so :terminal keeps the
      -- previous scheme's ANSI colors unless they're set here
      local tm = roles().terminal
      local ansi = {
        "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white",
        "bright_black", "bright_red", "bright_green", "bright_yellow",
        "bright_blue", "bright_magenta", "bright_cyan", "bright_white",
        "color16", "color17",
      }
      for i, name in ipairs(ansi) do
        vim.g["terminal_color_" .. (i - 1)] = tm[name]
      end
    end,
  },

  {
    "folke/todo-comments.nvim",
    opts = function(_, opts)
      local tg = roles().tags
      opts.colors = opts.colors or {}
      opts.colors.error = { tg.fix }
      opts.colors.warning = { tg.hack }
      opts.colors.info = { tg.todo }
      opts.colors.hint = { tg.note }
      opts.colors.default = { tg.perf }
      opts.colors.test = { tg.test }
    end,
  },

  {
    "nvim-mini/mini.icons",
    opts = {
      style = "glyph", -- cleaner than "ascii", uses actual nerd font glyphs
    },
  },
}
