const ArchLogo = () => {
    return Widget.EventBox({
        child: Widget.Label({
           label: "󰣇",
           className: "arch-logo"
        }),
        onPrimaryClick: () => Utils.exec("bash -c 'pkill wofi || wofi --show drun -i'"),
    })
}

export default () => {
    return ArchLogo()
}
