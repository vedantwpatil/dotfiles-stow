return {
  "saghen/blink.cmp",
  opts = function(_, opts)
    opts.keymap = vim.tbl_deep_extend("force", opts.keymap or {}, {
      -- Tab: cycle through completion items, then jump to next snippet node
      ["<Tab>"] = { "select_next", "snippet_forward", "fallback" },
      -- Shift-Tab: cycle backwards, then jump to previous snippet node
      ["<S-Tab>"] = { "select_prev", "snippet_backward", "fallback" },
    })
    return opts
  end,
}
