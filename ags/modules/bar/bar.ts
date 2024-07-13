import Date from "./buttons/date"
import Workspaces from "./buttons/workspaces"
import Battery from "./buttons/battery"
import Volume from "./buttons/volume"
import MediaControls from "./buttons/media-controls"

// User Widgets are declared here
const LeftItems = [ 
    Workspaces(),
    MediaControls()
]

const CenterItems = [

]

const RightItems = [
    Battery(),
    Volume(),
    Date(),
]

// Widget Groups are declared here
const Left = () => {
    return Widget.Box({
        vpack: "center",
        vexpand: true,
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
          className: "bar",
          name: `bar${monitor}`,
          exclusivity: "exclusive",
          anchor: ["top", "left", "right"],
          child: Widget.CenterBox({
              css: "min-height: 2px;",
              start_widget: Left(),
              center_widget: Center(),
              end_widget: Right(),
          }),
     })
 }
