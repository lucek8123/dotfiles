import ArchLogo from "./buttons/1-arch-logo"
import Workspaces from "./buttons/2-workspaces"
import NowPlaying from "./buttons/3-now-playing"
import Date from "./buttons/4-date"
import TrayIcons from "./buttons/5-tray-icons"
import UpdateIcon from "./buttons/6-system-update"
import Volume from "./buttons/7-volume"
import Battery from "./buttons/8-battery"

// User Widgets are declared here
const LeftItems = [ 
    ArchLogo(),
    Workspaces(),
]

const CenterItems = [
    NowPlaying(),
]

const RightItems = [
    TrayIcons(),
    UpdateIcon(),
    Volume(),
    Battery(),
    Date(),
]

// Widget Groups are declared here
const Left = () => {
    return Widget.Box({
    //     hpack: "start",
        children: LeftItems,
    })
}

const Center = () => {
    return Widget.Box({
        children: CenterItems,
    })
}

const Right = () => {
    return Widget.Box({
        hpack: "end",
        children: RightItems,
    })
}

// Bar is declared here 
export default (monitor: number = 0) => {
     return Widget.Window({
          name: `bar${monitor}`,
          className: "bar-window",
          exclusivity: "exclusive",
          anchor: ["top", "left", "right"],
          child: Widget.CenterBox({
              className: "bar",
              css: "min-height: 2px;",
              start_widget: Left(),
              center_widget: Center(),
              end_widget: Right(),
          }),
     })
 }
