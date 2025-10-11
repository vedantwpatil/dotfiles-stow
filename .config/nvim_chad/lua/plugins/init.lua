return {
  {
    "stevearc/conform.nvim",
    -- event = 'BufWritePre', -- uncomment for format on save
    config = function()
      require "configs.conform"
    end,
  },

  {
    "jose-elias-alvarez/null-ls.nvim",
    ft = { "python" },
    opts = function()
      return require "configs.null-ls"
    end,
  },

  -- These are some examples, uncomment them if you want to see them work!
  {
    "neovim/nvim-lspconfig",
    config = function()
      require("nvchad.configs.lspconfig").defaults()
      require "configs.lspconfig"
    end,
  },

  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "lua-language-server",
        "stylua",
        "html-lsp",
        "css-lsp",
        "prettier",
        "pyright",
        "mypy",
        "ruff",
        "black",
        "texlab",
        "jdtls",
        "clangd",
      },
    },
  },

  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = {
        "vim",
        "lua",
        "vimdoc",
        "html",
        "css",
        "python",
        "java",
        "javascript",
      },
    },
  },

  {
    "christoomey/vim-tmux-navigator",
    lazy = false,
  },

  {
    "L3MON4D3/LuaSnip",
    config = function()
      require("luasnip").config.set_config {
        enable_autosnippets = true,
        store_selection_keys = "<Tab>",
      }
      require("luasnip.loaders.from_lua").load { paths = "~/.config/nvim/lua/custom/snippets/" }
    end,
  },
  {
    "lervag/vimtex",
    lazy = false, -- Important: VimTeX should not be lazy-loaded
    config = function()
      -- VimTeX configuration goes here
      vim.g.vimtex_view_method = "zathura" -- or your preferred PDF viewer
      vim.g.vimtex_compiler_method = "latexmk"
      -- Add any other VimTeX configurations you needs
    end,
  },

  {
    "iurimateus/luasnip-latex-snippets.nvim",
    dependencies = { "L3MON4D3/LuaSnip", "lervag/vimtex" },
    config = function()
      require("luasnip-latex-snippets").setup()
      require("luasnip").config.setup {
        enable_autosnippets = true,
      }
    end,
    -- Only load when editing LaTeX files
    ft = { "tex", "latex" },
  },

  {
    "tpope/vim-fugitive",
    lazy = false,
    config = function() end,
  },

  {
    "nvim-lua/plenary.nvim",
  },

  {
    "folke/noice.nvim",
    event = "VeryLazy",
    opts = {
      -- Add any configuration options here
    },
    dependencies = {
      "MunifTanjim/nui.nvim",
      "rcarriga/nvim-notify",
    },
  },
  {
    "epwalsh/obsidian.nvim",
    version = "*", -- recommended, use latest release instead of latest commit
    lazy = true,
    ft = "markdown",
    -- Replace the above line with this if you only want to load obsidian.nvim for markdown files in your vault:
    -- event = {
    --   -- If you want to use the home shortcut '~' here you need to call 'vim.fn.expand'.
    --   -- E.g. "BufReadPre " .. vim.fn.expand "~" .. "/my-vault/**.md"
    --   "BufReadPre path/to/my-vault/**.md",
    --   "BufNewFile path/to/my-vault/**.md",
    -- },
    dependencies = {
      -- Required.
      "nvim-lua/plenary.nvim",

      -- see below for full list of optional dependencies 👇
    },
    opts = {
      workspaces = {
        {
          name = "Second Brain",
          path = "/Users/vedantpatil/Documents/Second Brain",
        },
      },

      -- see below for full list of options 👇
    },
  },
}
