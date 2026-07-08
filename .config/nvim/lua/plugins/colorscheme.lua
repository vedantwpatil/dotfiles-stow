return {
  { -- Change the plugin to the kanagawa-paper fork
    "thesimonho/kanagawa-paper.nvim",

    lazy = false,
    priority = 1000,

    opts = {
      -- The main editor background remains transparent
      transparent = true,

      -- Your previous customization for the gutter background
      colors = {
        theme = {
          ink = { -- Target the 'ink' theme specifically
            ui = {
              bg_gutter = "none",
            },
          },
        },
      },
    },

    config = function(_, opts)
      -- Load the kanagawa-paper theme with your options
      require("kanagawa-paper").setup(opts)

      -- Set the active colorscheme to the 'ink' variant
      vim.cmd("colorscheme kanagawa-paper-ink")
    end,
  },

  {
    "nvim-mini/mini.icons",
    opts = {
      style = "glyph", -- cleaner than "ascii", uses actual nerd font glyphs
    },
  },
}

-- return {
--   "rebelot/kanagawa.nvim",
--
--   lazy = false,
--
--   priority = 1000,
--
--   opts = {
--     -- Keep the main editor background transparent
--     transparent = true,
--
--     colors = {
--       theme = {
--         all = {
--           ui = {
--             -- This makes the gutter transparent as well
--             bg_gutter = "none",
--           },
--         },
--       },
--     },
--
--     -- Modify the overrides function to set a solid float background
--     overrides = function(colors)
--       return {
--         -- Set the background of floating windows to a dark color from the palette
--         NormalFloat = { bg = colors.palette.sumiInk0 },
--       }
--     end,
--   },
--
--   config = function(_, opts)
--     -- Load the Kanagawa theme with the options specified in the `opts` table
--     require("kanagawa").setup(opts)
--
--     -- Set the active colorscheme to the 'wave' variant of Kanagawa
--     vim.cmd("colorscheme kanagawa-wave")
--   end,
-- }
