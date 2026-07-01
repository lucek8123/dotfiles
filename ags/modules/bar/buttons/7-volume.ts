const audio = await Service.import("audio")

const AudioIcon = () => {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    const icon = audio.speaker.bind("volume").as(volume => {
        const icon: number = audio.speaker.is_muted ? 0 : ([101, 67, 34, 1, 0].find(threshold => threshold <= volume * 100) ?? 0)

        return `audio-volume-${icons[icon]}-symbolic`
    })

    return Widget.Icon({
        className: "audioIcon",
        icon: icon,
    })
}

const AudioLabel = () => {
    return Widget.Label({
        className: "audioLabel",
        label: audio.speaker.bind("volume").as(v => `${Math.round(v * 100)}%`),
    })
}

const AudioSlider = () => {
    return Widget.Slider({
        className: "audioSlider",
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => audio.speaker.volume = value,
        setup: self => self.hook(audio.speaker, () => {
            self.value = audio.speaker.volume || 0
        }),
    })
}

export default () => {
    return Widget.Box({
        spacing: 5,
        className: "audio",
        hpack: "center",
        vertical: true,
        children: [
            AudioIcon(),
            AudioLabel(),
            // AudioSlider(),
        ]
    })
}
