-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")

local lspconfig = require("lspconfig")

-- Racket
lspconfig.racket_langserver.setup({
  cmd = { "racket", "-l", "racket-langserver" },
  filetypes = { "racket", "scheme" },
  root_dir = lspconfig.util.root_pattern("info.rkt", "git"),
})

-- Haskell
vim.api.nvim_create_autocmd("BufWritePost", {
  pattern = "*.hs",
  callback = function()
    -- pcall (protected call) acts as a try-catch.
    -- If the REPL is closed and reload() throws an error, pcall safely swallows it.
    pcall(function()
      require("haskell-tools").repl.reload()
    end)
  end,
})
