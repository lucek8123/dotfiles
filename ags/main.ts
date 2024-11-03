import Bar from "./modules/bar/bar"
import Notifications from "./modules/notifications/notification"

App.config({
    style: "./style.css",
    windows: [
        Bar(),
        Notifications(), 
    ],
})

