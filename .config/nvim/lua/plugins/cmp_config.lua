return {
  {
    "hrsh7th/nvim-cmp",
    dependencies = {
      "L3MON4D3/LuaSnip",
      -- other dependencies
    },
    ---@param opts cmp.ConfigSchema
    opts = function(_, opts)
      local cmp = require("cmp")
      local luasnip = require("luasnip")

      opts.mapping = vim.tbl_extend("force", opts.mapping, {
        ["<Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
            -- If completion menu is visible, try to select next or confirm
            local entry = cmp.get_selected_entry()
            if not entry then
              cmp.select_next_item({ behavior = cmp.SelectBehavior.Select })
            else
              cmp.confirm({ select = true }) -- Confirm the selected entry
            end
          elseif luasnip.expand_or_jumpable() then
            -- If a snippet is active and jumpable, jump to the next placeholder
            luasnip.expand_or_jump()
          else
            -- Otherwise, fallback (e.g., insert a tab character or other configured behavior)
            fallback()
          end
        end, { "i", "s", "c" }), -- "i" for insert, "s" for select, "c" for command mode

        ["<S-Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
            -- If completion menu is visible, select previous item
            cmp.select_prev_item({ behavior = cmp.SelectBehavior.Select })
          elseif luasnip.jumpable(-1) then
            -- If a snippet is active and jumpable, jump to the previous placeholder
            luasnip.jump(-1)
          else
            -- Otherwise, fallback
            fallback()
          end
        end, { "i", "s", "c" }),
      })
      return opts
    end,
  },
}
