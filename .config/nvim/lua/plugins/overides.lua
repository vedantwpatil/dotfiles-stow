return {
  { "akinsho/bufferline.nvim", enabled = false },
  { "folke/flash.nvim", enabled = false },
  { "lervag/vimtex", ft = { "tex", "bib" } },
  { "mrcjkb/neotest-haskell", ft = "haskell" },
  { "folke/noice.nvim", enabled = true },
  {
    "nvim-neo-tree/neo-tree.nvim",
    enabled = false,
  },

  -- { "RRethy/vim-illuminate", enabled = false } }
  {
    "folke/snacks.nvim",
    opts = {
      dashboard = {
        sections = {
          { section = "header" },
          {
            section = "terminal",
            -- cmd = "pokemon=(scizor dragapult haxorus zekrom gene); pokemon-colorscripts -n ${pokemon[$RANDOM % ${#pokemon[@]} + 1]} --no-title; sleep .1",
            cmd = "pokemon-colorscripts -n scizor --no-title; sleep .1",
            random = 10,
            pane = 2,
            indent = 8,
            height = 30,
          },
          { section = "keys", gap = 1, padding = 1 },
          { section = "startup" },
        },
        preset = {
          header = [[
                ██╗      █████╗ ███████╗██╗    ██╗██╗    ██╗██╗███╗   ███╗          Z
            ██║     ██╔══██╗╚══███╔╝╚██╗  ██╔╝██║    ██║██║████╗ ████║      Z
        ██║     ███████║  ███╔╝  ╚████╔╝  ██║    ██║██║██╔████╔██║  z
        ██║     ██╔══██║ ███╔╝    ╚██╔╝   ╚██╗ ██╔╝ ██║██║╚██╔╝██║ z
      ███████╗██║  ██║███████╗   ██║     ╚████╔╝  ██║██║ ╚═╝ ██║
      ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═══╝   ╚═╝╚═╝     ╚═╝
          ]],
          -- stylua: ignore
          keys = {
            { icon = " ", key = "f", desc = "Find File",       action = ":lua LazyVim.pick()()" },
            { icon = " ", key = "n", desc = "New File",        action = ":ene | startinsert" },
            { icon = " ", key = "r", desc = "Recent Files",    action = ":lua LazyVim.pick('oldfiles')()" },
            { icon = " ", key = "g", desc = "Find Text",       action = ":lua LazyVim.pick('live_grep')()" },
            { icon = " ", key = "c", desc = "Config",          action = ":lua LazyVim.pick.config_files()()" },
            { icon = " ", key = "s", desc = "Restore Session", action = ':lua require("persistence").load()' },
            { icon = " ", key = "x", desc = "Lazy Extras",    action = ":LazyExtras" },
            { icon = "󰒲 ", key = "l", desc = "Lazy",           action = ":Lazy" },
            { icon = " ", key = "q", desc = "Quit",           action = ":qa" },
          },
        },
      },
    },
  },

  {
    "SmiteshP/nvim-navic",
    lazy = true,
    opts = {
      lsp = {
        auto_attach = true,
      },
      highlight = true,
      separator = "  ",
      depth_limit = 4,
      depth_limit_indicator = "…",
      safe_output = true,
      lazy_update_context = true,
    },
  },

  {
    "nvim-lualine/lualine.nvim",
    enabled = true,
    opts = function(_, opts)
      -- Keep LazyVim's theme/loading logic, but override the visuals
      opts.options.theme = "kanagawa-paper-ink"
      opts.options.component_separators = ""
      opts.options.section_separators = ""
      -- globalstatus = true is already handled by LazyVim by default

      local navic = require("nvim-navic")

      opts.sections = {
        lualine_a = {
          {
            "mode",
            fmt = function(str)
              return str:sub(1, 1)
            end,
          },
        },
        lualine_b = {
          "branch",
          "diff",
        },
        lualine_c = {
          {
            "filename",
            path = 1,
            symbols = { modified = " ●", readonly = " [RO]", unnamed = "" },
          },
          {
            function()
              return navic.get_location()
            end,
            cond = function()
              return navic.is_available()
            end,
          },
        },
        lualine_x = {
          {
            function()
              local reg = vim.fn.reg_recording()
              if reg == "" then
                return ""
              end
              return "󰑋 @" .. reg
            end,
          },
          "diagnostics",
        },
        lualine_y = { "filetype" },
        lualine_z = { "location" },
      }
    end,
  },
}
