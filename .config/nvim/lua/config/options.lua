-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
vim.opt.smoothscroll = false
vim.opt.wrap = true
vim.g.snacks_animate = false
vim.opt.laststatus = 3 -- One statusline at the bottom for all windows
vim.opt.conceallevel = 2

vim.api.nvim_create_autocmd("FileType", {
  pattern = { "c", "cpp", "rust", "go" },
  callback = function()
    vim.opt_local.conceallevel = 0
  end,
  desc = "Disable conceal for systems languages to ensure memory/pointer visibility",
})
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "python", "markdown", "tex", "html", "css" },
  callback = function()
    vim.opt_local.conceallevel = 2
  end,
  desc = "Enable conceal for high-level logic and prose",
})
