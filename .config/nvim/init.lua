-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")

local lspconfig = require("lspconfig")

lspconfig.racket_langserver.setup({
  cmd = { "racket", "-l", "racket-langserver" },
  filetypes = { "racket", "scheme" },
  root_dir = lspconfig.util.root_pattern("info.rkt", "git"),
})
