-- LSP keybindings
vim.api.nvim_create_autocmd('LspAttach', {
  callback = function(event)
    local opts = {buffer = event.buf}

    vim.keymap.set('n', 'gd', function() vim.lsp.buf.definition() end, opts)
    vim.keymap.set('n', 'K', function() vim.lsp.buf.hover({border = 'rounded'}) end, opts)
    vim.keymap.set('n', '<leader>vws', function() vim.lsp.buf.workspace_symbol() end, opts)
    vim.keymap.set('n', '<leader>vd', function() vim.diagnostic.open_float() end, opts)
    vim.keymap.set('n', '[d', function() vim.diagnostic.goto_next() end, opts)
    vim.keymap.set('n', ']d', function() vim.diagnostic.goto_prev() end, opts)
    vim.keymap.set('n', '<leader>vca', function() vim.lsp.buf.code_action() end, opts)
    vim.keymap.set('n', '<leader>vrr', function() vim.lsp.buf.references() end, opts)
    vim.keymap.set('n', '<leader>vrn', function() vim.lsp.buf.rename() end, opts)
    vim.keymap.set('i', '<C-h>', function() vim.lsp.buf.signature_help() end, opts)

    -- if vim.lsp.inlay_hint then
    --     vim.lsp.inlay_hint.enable(true, { 0 })
    -- end
  end,
})

-- Mason Setup
require('mason').setup({
    ui = {
        icons = {
            package_installed = "✓",
            package_pending = "➜",
            package_uninstalled = "✗"
        }
    }
})

-- Completion capabilities shared by every language server
vim.lsp.config('*', {
  capabilities = require('cmp_nvim_lsp').default_capabilities(),
})

-- Make lua_ls aware of the Neovim runtime and config
local runtime_path = vim.split(package.path, ';')
table.insert(runtime_path, 'lua/?.lua')
table.insert(runtime_path, 'lua/?/init.lua')

vim.lsp.config('lua_ls', {
  settings = {
    Lua = {
      telemetry = { enable = false },
      runtime = {
        version = 'LuaJIT',
        path = runtime_path,
      },
      diagnostics = {
        globals = { 'vim' }
      },
      workspace = {
        checkThirdParty = false,
        library = {
          vim.fn.expand('$VIMRUNTIME/lua'),
          vim.fn.stdpath('config') .. '/lua',
        }
      },
    }
  }
})

-- qmlls ships as `qmlls6` on some systems
vim.lsp.config('qmlls', {
  cmd = { 'qmlls6' }
})

-- Mason installs missing servers and automatically enables installed ones
require('mason-lspconfig').setup({
  ensure_installed = {'clangd', 'ts_ls', 'rust_analyzer', 'pyright', "lua_ls", "verible"},
})

-- qmlls is not managed by Mason, so enable it explicitly when available
if vim.fn.executable('qmlls6') == 1 then
  vim.lsp.enable('qmlls')
end

-- Mason install debugger adapters 
require("mason-nvim-dap").setup({
    ensure_installed = { "codelldb" }
})

-- LSP selections keybindings
local cmp = require('cmp')
local cmp_select = {behavior = cmp.SelectBehavior.Select}

cmp.setup({
  sources = {
    {name = 'path'},
    {name = 'nvim_lsp'},
    {name = 'luasnip', keyword_length = 2},
    {name = 'buffer', keyword_length = 3},
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
    ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
    ['<C-y>'] = cmp.mapping.confirm({ select = true }),
    ['<C-Space>'] = cmp.mapping.complete(),
  }),
  snippet = {
    expand = function(args)
      require('luasnip').lsp_expand(args.body)
    end,
  },
})

-- Setup autoclose 
require("autoclose").setup()

-- Snippets
local ls = require('luasnip')
require('luasnip.loaders.from_vscode').lazy_load()

ls.config.set_config {
    history = true,
    updateevents = "TextChanged,TextChangedI",
}

vim.keymap.set({'i', 's'}, '<C-k>', function()
    if ls.expand_or_jumpable() then
        ls.expand_or_jump()
    end
end, { silent = true })

vim.keymap.set({'i', 's'}, '<C-j>', function()
    if ls.jumpable(-1) then
        ls.jump(-1)
    end
end, { silent = true })

vim.keymap.set('i', '<C-l>', function()
    if ls.choice_active() then
        ls.change_choice(1)
    end
end, { silent = true })

vim.keymap.set('n', '<leader><leader>s', '<cmd> source ~/.config/nvim/after/plugin/luasnip.lua<CR>')
