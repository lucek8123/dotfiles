-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to load mapleader before lazy.nvim
vim.g.mapleader = " "

-- Plugins
local plugins = {
    -- Fuzzy Finder 
    {
        'nvim-telescope/telescope.nvim', tag = '0.1.8',
        dependencies = { 'nvim-lua/plenary.nvim' }
    },

    -- Treesitter
    {
        'nvim-treesitter/nvim-treesitter',
    },
    build = ':TSUpdate',

    -- Harpoon
    { "theprimeagen/harpoon" },

    -- Undotree
    { "mbbill/undotree" },

    -- Git
    { "tpope/vim-fugitive" },

    -- Theme
    { 'catppuccin/nvim', name = "catppuccin" },

    -- LSP
    {
        'VonHeikemen/lsp-zero.nvim',
        branch = "v3.x",
        dependencies = {
            -- LSP Support
            {'neovim/nvim-lspconfig'},
            {'williamboman/mason.nvim'},
            {'williamboman/mason-lspconfig.nvim'},

            -- Autocompletion
            {'hrsh7th/nvim-cmp'},
            {'hrsh7th/cmp-buffer'},
            {'hrsh7th/cmp-path'},
            {'saadparwaiz1/cmp_luasnip'},
            {'hrsh7th/cmp-nvim-lsp'},
            {'hrsh7th/cmp-nvim-lua'},

            -- Snippets
            {'L3MON4D3/LuaSnip'},
            {'rafamadriz/friendly-snippets'}
        }
    },

    -- Comment
    { 'numToStr/Comment.nvim' },

    -- Debug Adapter Protocol 
    {
        "rcarriga/nvim-dap-ui",
        dependencies = {
            "mfussenegger/nvim-dap",
            "nvim-neotest/nvim-nio"
        }
    },

    -- HTML autotag
    { "windwp/nvim-ts-autotag" },
    { "m4xshen/autoclose.nvim" },
}


require("lazy").setup(plugins, {})
