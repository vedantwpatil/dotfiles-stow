return {
  {
    "neovim/nvim-lspconfig",
    opts = { inlay_hints = { enabled = false } },
  },
  {
    -- LazyVim's lang.rust extra runs rust_analyzer through rustaceanvim,
    -- not plain nvim-lspconfig, so rust-analyzer settings go here
    "mrcjkb/rustaceanvim",
    opts = {
      server = {
        default_settings = {
          ["rust-analyzer"] = {
            cargo = { features = "all" },
            checkOnSave = { enable = true },
            check = {
              -- overrideCommand (not command = "clippy") since it must own
              -- placement of --message-format=json around the -- separator;
              -- matches `cargo clippy-strict` from ~/.cargo/config.toml.
              overrideCommand = {
                "cargo",
                "clippy",
                "--workspace",
                "--all-targets",
                "--message-format=json",
                "--",
                "-D",
                "clippy::unwrap_used",
                "-D",
                "clippy::expect_used",
                "-D",
                "clippy::panic",
                "-D",
                "clippy::unimplemented",
                "-D",
                "clippy::todo",
                "-D",
                "clippy::unreachable",
                "-D",
                "clippy::dbg_macro",
                "-W",
                "clippy::pedantic",
                "-W",
                "clippy::nursery",
                "-W",
                "clippy::indexing_slicing",
                "-W",
                "clippy::arithmetic_side_effects",
              },
            },
            imports = { group = { enable = false } },
            completion = { postfix = { enable = false } },
          },
        },
      },
    },
  },
  { "akinsho/bufferline.nvim", enabled = false },
  { "folke/flash.nvim", enabled = false },
  { "lervag/vimtex", ft = { "tex", "bib" } },
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
      indent = { enabled = false },
      scope = { enabled = false },
      image = { enabled = true },
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

  {
    "mfussenegger/nvim-lint",
    opts = {
      linters = {
        ["markdownlint-cli2"] = {
          args = { "--disable", "MD013", "--" },
        },
        ["markdownlint"] = {
          args = { "--disable", "MD013", "--" },
        },
      },
    },
  },
}
