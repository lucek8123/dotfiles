const systemtray = await Service.import("systemtray")

const SystemTrayIcon = (item) => {
    return Widget.EventBox({
        child: Widget.Icon(/* {css: "-gtk-icon-style=symbolic"} */).bind('icon', item, 'icon'),
        tooltipMarkup: item.bind('tooltip_markup'),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event),
        className: "tray-icon"
    })
}

const SystemTrayIcons = () => {
    return Widget.Box({
        children: systemtray.bind('items').as(i => i.map(item => SystemTrayIcon(item))),
        className: "tray-icons-box",
        visible: systemtray.bind('items').transform(i => {
            print(i.length)
            return i.length !== 0
        })    
    }).hook(systemtray, (self, items) => {
        print(self.visible)
    })

}

export default () => {
    return SystemTrayIcons()
}
