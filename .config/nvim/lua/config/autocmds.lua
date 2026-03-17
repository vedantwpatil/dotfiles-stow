-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

-- Enable inlay hints on LSP attach (Primeagen-style: always on, dimmed)
vim.api.nvim_create_autocmd("LspAttach", {
  callback = function(args)
    local client = vim.lsp.get_client_by_id(args.data.client_id)
    if client and client.supports_method("textDocument/inlayHint") then
      vim.lsp.inlay_hint.enable(true, { bufnr = args.buf })
    end
  end,
})

-- Dim inlay hints so they don't compete with real code
vim.api.nvim_create_autocmd("ColorScheme", {
  callback = function()
    vim.api.nvim_set_hl(0, "LspInlayHint", { link = "Comment", italic = true })
  end,
})
vim.api.nvim_set_hl(0, "LspInlayHint", { link = "Comment", italic = true })
-- vim.api.nvim_create_autocmd("FileType", {
--   pattern = { "python", "rust", "go", "c" },
--   callback = function()
--     vim.opt_local.spell = true
--   end,
-- })
