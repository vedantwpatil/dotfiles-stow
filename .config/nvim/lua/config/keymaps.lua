-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- Scroll down and up faster while cetnering
vim.keymap.set("n", "<C-d>", "<C-d>zz", { desc = "Scroll down and center" })
vim.keymap.set("n", "<C-u>", "<C-u>zz", { desc = "Scroll up and center" })

local map = vim.keymap.set

-- Keymap to spellcheck the current line, applying the first suggestion
map("n", "<leader>sc", function()
  local current_line = vim.api.nvim_win_get_cursor(0)[1]
  local original_pos = vim.api.nvim_win_get_cursor(0)

  -- Move to the start of the line to begin scanning
  vim.api.nvim_win_set_cursor(0, { current_line, 0 })

  while true do
    local pos_before_jump = vim.api.nvim_win_get_cursor(0)
    -- Execute the normal mode command to jump to the next spelling error
    vim.cmd("normal! ]s")
    local pos_after_jump = vim.api.nvim_win_get_cursor(0)

    -- If the cursor moved to a new line or did not move at all, stop.
    if
      pos_after_jump[1] ~= current_line
      or (pos_before_jump[1] == pos_after_jump[1] and pos_before_jump[2] == pos_after_jump[2])
    then
      break
    end

    -- Apply the first suggestion for the misspelled word
    vim.cmd("normal! 1z=")
  end

  -- Restore the original cursor position
  vim.api.nvim_win_set_cursor(0, original_pos)
  vim.notify("Spellcheck complete for the current line.", vim.log.levels.INFO)
end, { desc = "Fix spelling on current line" })
