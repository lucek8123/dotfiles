import ArchLogo from "./buttons/1-arch-logo"
import Workspaces from "./buttons/2-workspaces"
import NowPlaying from "./buttons/3-now-playing"
import Date from "./buttons/4-date"
import TrayIcons from "./buttons/5-tray-icons"
import UpdateIcon from "./buttons/6-system-update"
import Volume from "./buttons/7-volume"
import Battery from "./buttons/8-battery"

// Widget Groups are declared here
const Left = (monitor: number) => {
    return Widget.Box({
        className: "bar-left",
        hpack: "start",
        children: [ 
            ArchLogo(),
            Workspaces(),
        ]
    })
}

const Center = (monitor: number) => {
    return Widget.Box({
        className: "bar-middle",
        children: [
            NowPlaying()
        ]
    })
}

const Right = (monitor: number) => {
    return Widget.Box({
        className: "bar-right",
        hpack: "end",
        children: [
            TrayIcons(),
            UpdateIcon(),
            Volume(),
            Battery(),
            Date(),
        ]
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
              start_widget: Left(monitor),
              center_widget: Center(monitor),
              end_widget: Right(monitor),
          }),
     })
 }
