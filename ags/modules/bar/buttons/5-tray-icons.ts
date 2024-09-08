import { TrayItem } from "types/service/systemtray"

const systemtray = await Service.import("systemtray")

const SystemTrayIcon = (item: TrayItem) => {
    return Widget.EventBox({
        child: Widget.Icon({ 
            css: "font-size: 20px; ",
            icon: item.bind("icon")
        }),
        tooltipMarkup: item.bind('tooltip_markup'),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event),
        className: "tray-icon",
    })
}

const SystemTrayIcons = () => {
    return Widget.Box({
        spacing: 10,
        children: systemtray.bind('items').as(i => i.map(item => SystemTrayIcon(item))),
        className: "tray-icons-box",
        visible: systemtray.bind('items').transform(i => {
            return i.length !== 0
        })    
    })
}

export default () => {
    return SystemTrayIcons()
}
