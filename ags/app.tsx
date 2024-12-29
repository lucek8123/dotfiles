import Bar from "./modules/bar/bar"
import Notifications from "./modules/notifications/notification"
import { App } from "astal/gtk3"

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

// App.config({
//     style: "./style.css",
//     windows: [
//         Bar(),
//         Notifications(), 
//     ],
// })
//
