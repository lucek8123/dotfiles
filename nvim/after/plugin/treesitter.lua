-- nvim-treesitter (main branch) only installs parsers and queries; Neovim's
-- tree-sitter features have to be enabled separately (see below).
--
-- Install into Neovim's site directory and put it first on 'runtimepath' so
-- the parsers match the version of nvim-treesitter in use.
require("nvim-treesitter").setup {
  install_dir = vim.fn.stdpath("data") .. "/site",
}

-- A list of parser names, or "all" (the five listed parsers should always be installed)
require("nvim-treesitter").install {
  "c", "cpp", "swift", "python", "html", "javascript", "typescript", "markdown", "lua", "vim", "vimdoc", "query",
}

-- Enable tree-sitter highlighting for every filetype that has a parser.
vim.api.nvim_create_autocmd("FileType", {
  callback = function()
    pcall(vim.treesitter.start)
  end,
})
