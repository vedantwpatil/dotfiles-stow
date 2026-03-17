return {
  "vedantwpatil/manim-nvim",
  dir = "/Users/vedantpatil/development/personal/projects/lua/manim-nvim",
  dependencies = { "nvim-lua/plenary.nvim" },
  lazy = true,
  config = function()
    require("manim-nvim").setup()
  end,
}
