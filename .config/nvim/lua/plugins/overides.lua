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
          {
            "filename",
            path = 1,
            symbols = { modified = " [+]", readonly = " [RO]", unnamed = "" }, -- Crucial file states
          },
        },
        lualine_c = {},
        lualine_x = { "diagnostics" },
        lualine_y = { "branch" },
        lualine_z = { "location" },
      }
    end,
  },
}
