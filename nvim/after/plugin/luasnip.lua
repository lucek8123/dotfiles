local ls = require("luasnip")
local s = ls.snippet
local i = ls.insert_node
local t = ls.text_node 
local fmt = require("luasnip.extras.fmt").fmt
local fmta = require("luasnip.extras.fmt").fmta

ls.add_snippets("cpp", {
    s(
        { trig = "comp", desc = "Main function snippet for competitive programming" },
        fmt(
            [[
#include <iostream>
#include <algorithm>
#include <vector>
{}
using namespace std;

int main() {{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    {}

    return 0;
}}
            ]],
            { i(1), i(2, "// Code here") } -- Placeholder inside main()
        )
    )
})
