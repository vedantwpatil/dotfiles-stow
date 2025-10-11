return {
  "vim-test/vim-test",
  keys = {
    { "<leader>t", desc = "test" },
    { "<leader>tt", "<cmd>TestNearest<cr>", desc = "Run nearest test" },
    { "<leader>tf", "<cmd>TestFile<cr>", desc = "Run tests in file" },
    { "<leader>ts", "<cmd>TestSuite<cr>", desc = "Run test suite" },
    { "<leader>tl", "<cmd>TestLast<cr>", desc = "Run last test" },
    { "<leader>tv", "<cmd>TestVisit<cr>", desc = "Visit test file" },
  },
  config = function()
    vim.g["test#strategy"] = "neovim"
    vim.g["test#neovim#term_position"] = "belowright"
    vim.g["test#java#runner"] = "gradletest"
  end,
}
