local dap = require("dap")
local dapui = require("dapui")

dapui.setup()

-- Adapters configuration
dap.adapters.codelldb = {
	type = "server",
	port = "${port}",
	executable = {
		command = "codelldb",
		args = { "--port", "${port}" },
	},
}

-- General keymaps (running, stepping over/into/out)
vim.keymap.set('n', '<leader>dc', function() dap.continue() end)
vim.keymap.set('n', '<leader>dq', function() dap.disconnect() end)
vim.keymap.set('n', '<F5>', function() dap.continue() end)
vim.keymap.set('n', '<F10>', function() dap.step_over() end)
vim.keymap.set('n', '<F11>', function() dap.step_into() end)
vim.keymap.set('n', '<F12>', function() dap.step_out() end)

-- Break Points 
vim.keymap.set('n', '<Leader>b', function() dap.toggle_breakpoint() end)
vim.keymap.set('n', '<Leader>B', function() dap.set_breakpoint() end)
vim.keymap.set('n', '<Leader>lb', function() dap.set_breakpoint(nil, nil, vim.fn.input('Log point message: ')) end)

-- Opening REPL/Debugging-console 
vim.keymap.set('n', '<Leader>dr', function() dap.repl.open() end)
vim.keymap.set('n', '<Leader>dl', function() dap.run_last() end)

-- Auto open nvim-dap-ui when debugging starts
dap.listeners.before.attach.dapui_config = function()
  dapui.open()
end
dap.listeners.before.launch.dapui_config = function()
  dapui.open()
end
dap.listeners.before.event_terminated.dapui_config = function()
  dapui.close()
end
dap.listeners.before.event_exited.dapui_config = function()
  dapui.close()
end

-- Run Prelaunch Tasks
local overseer = require('overseer')
overseer.setup()

local hook = function(task_defn, util)
    util.add_component(task_defn, { "on_complete_notify", statuses = { "SUCCESS" } })

    util.add_component(task_defn, { "on_output_quickfix",
        close = true,
        open = true,
        open_on_exit = "failure"
    })

    util.add_component(task_defn, {
        'on_result_diagnostics_quickfix',
        close = true,
        open = true
    })
end

overseer.add_template_hook(nil, hook)

