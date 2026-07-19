-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

-- Rust convention is 100 chars, not the default 80
vim.api.nvim_create_autocmd("FileType", { pattern = "rust", command = "setlocal colorcolumn=100" })
