return {
  "epwalsh/obsidian.nvim",
  version = "*",
  lazy = true,
  ft = "markdown",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  opts = {
    workspaces = {
      {
        name = "Second Brain",
        path = "/Users/vedantpatil/Documents/second-brain/",
      },
    },

    note_id_func = function(title)
      if title == nil or title == "" then
        return os.date("%Y-%m-%d")
      else
        return title:gsub(" ", "-"):gsub("[^A-Za-z0-9-]", ""):lower()
      end
    end,

    templates = {
      folder = "/Users/vedantpatil/Documents/second-brain/06 - Archive/",
      date_format = "%Y-%m-%d-%a",
      time_format = "%H:%M",
    },

    -- Add these options to work better with render-markdown.nvim
    ui = {
      enable = false, -- Disable obsidian.nvim's UI features
    },

    follow_url_func = function(url)
      vim.fn.jobstart({ "open", url })
    end,
  },
}
