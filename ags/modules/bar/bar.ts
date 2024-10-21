import ArchLogo from "./buttons/1-arch-logo"
import Workspaces from "./buttons/2-workspaces"
import NowPlaying from "./buttons/3-now-playing"
import Date from "./buttons/4-date"
import TrayIcons from "./buttons/5-tray-icons"
import UpdateIcon from "./buttons/6-system-update"
import Volume from "./buttons/7-volume"
import Battery from "./buttons/8-battery"

const Seperator = () => {
    return Widget.Separator({vertical: true})
}

// Widget Groups are declared here
const Left = (monitor: number) => {
    return Widget.Box({
        className: "bar-left",
        // hpack: "start",
        vpack: "start",
        vertical: true,
        children: [ 
            ArchLogo(),
        ]
    })
}

const Center = (monitor: number) => {
    return Widget.Box({
        className: "bar-middle",
        children: [
            Workspaces(),
            // NowPlaying()
        ],
        vpack: "start",
        vertical: true,
    })
}

const Right = (monitor: number) => {
    return Widget.Box({
        className: "bar-right",
        hpack: "center",
        vpack: "end",
        vertical: true,
        children: [
            UpdateIcon(),
            Seperator(),
            Volume(),
        ]
    })
}

// Bar is declared here 
export default (monitor: number = 0) => {
     return Widget.Window({
          name: `bar${monitor}`,
          className: "bar-window",
          exclusivity: "exclusive",
          anchor: ["left", "top", "bottom"],
          child: Widget.CenterBox({
              className: "bar",
              start_widget: Left(monitor),
              center_widget: Center(monitor),
              end_widget: Right(monitor),
              vertical: true,
          }),
     })
 }
