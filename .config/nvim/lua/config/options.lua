-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
vim.opt.smoothscroll = false
vim.opt.wrap = true
vim.g.snacks_animate = false
vim.lsp.inlay_hint.enable(false)

vim.opt.scrolloff = 8
-- more useful diffs: ignore whitespace, use a smarter diff algorithm
vim.opt.diffopt:append("iwhite")
vim.opt.diffopt:append("algorithm:histogram")
vim.opt.diffopt:append("indent-heuristic")
-- nicer rendering of hidden characters when :set list is toggled
vim.opt.listchars = "tab:^ ,nbsp:¬,extends:»,precedes:«,trail:•"
