const battery = await Service.import("battery") 

const BatteryIcon = () => {
    return Widget.Icon({ 
        icon: battery.bind("icon_name"),
        className: "battery-icon"
    })
}

const BatteryLabel = () => {
    return Widget.Label({
        className: "battery-label",
        label: battery.bind("percent").as(p => `${p}%`)
    })
}

const BatteryLevelBar = () => {
    const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
    return Widget.LevelBar({
        class_names: battery.bind('charging').as(
            ch => ch ? ['battery', 'charging'] : ['battery']
        ),
        widthRequest: 140,
        vpack: "center",
        value,
    })
}

export default () => {
    return Widget.Box({
        className: "battery-box",
        visible: battery.bind("available"),
        spacing: 5,
        children: [
            BatteryIcon(),
            BatteryLabel(),
            // BatteryLevelBar(),
        ],
    })
}
