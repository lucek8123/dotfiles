return {
  name = "olympics_clean",
  builder = function()
    local output = vim.fn.expand("%:r") .. ".out"
    return {
      cmd = { "rm" },
      args = { output },
      components = { { "on_output_quickfix", open = true }, "default" },
    }
  end,
  condition = {
    filetype = { "cpp" },
  },
}
