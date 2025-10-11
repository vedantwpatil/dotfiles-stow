
vim.api.nvim_create_autocmd("FileType", {
  pattern = "tex",
  callback = function()
    vim.opt_local.expandtab = true
    vim.opt_local.shiftwidth = 2
    vim.opt_local.tabstop = 2
    vim.opt_local.softtabstop = 2
    
    -- Enable auto-expanding snippets
    require("luasnip").config.setup({
      enable_autosnippets = true,
    })
  end,
})
