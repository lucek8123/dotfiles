const battery = await Service.import("battery") 

const BatteryIcon = () => {
    const icon = Utils.merge([battery.bind("percent"), battery.bind("charging")], (p, charging) => {
        const isCharging = charging ? "-charging" : ""

        return `battery-level-${Math.floor(p / 10) * 10}${isCharging}-symbolic`
    })

    return Widget.Icon({ 
        icon: icon,
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
            BatteryLevelBar(),
        ],
    })
}
