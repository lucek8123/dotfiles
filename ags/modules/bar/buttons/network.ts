const network = await Service.import('network')

const WifiIcon = () => {
    return Widget.Icon({
        icon: network.wifi.bind('icon_name'),
    })
}

const WiredIcon = () => {
    return Widget.Icon({
        icon: network.wired.bind("icon_name")
    })
}

export default () => {
    return Widget.Stack({
        className: "network",
        children: {
            wifi: WifiIcon(),
            wired: WiredIcon()
        },
        shown: network.bind('primary').as(p => p || 'wifi'),
    })
}
