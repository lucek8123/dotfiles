const entry = App.configDir + '/main.ts'
const outfile = '/tmp/ags/js/main.js'

// Generate css from scss 
const scss = `${App.configDir}/style/style.scss`
const css = `${App.configDir}/style.css`
Utils.exec(`sassc ${scss} ${css}`)

// Monitor scss directory 
Utils.monitorFile(`${App.configDir}/style/`,
    function() {
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
        print("Reloaded css")
    }
)

try {
    await Utils.execAsync([
            "esbuild", "--bundle", entry,
            "--format=esm",
            `--outfile=${outfile}`,
            "--external:resource://*",
            "--external:gi://*",
            "--external:file://*",
        ])
    await import(`file://${outfile}`)
} catch (error) {
    console.error(error)
}
