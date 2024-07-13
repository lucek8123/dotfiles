const mpris = await Service.import("mpris")

const MediaLabel = (i: number = -1) => {
    var label = Utils.watch("", mpris, () => {
        if (mpris.players.at(i)){
            const { track_artists, track_title } = mpris.players.at(i)!

            if (track_title.trim() == "") {
                return "Nothing is playing"
            }

            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return "Nothing is playing"
        }
    })

    return Widget.Label({
        className: "media-label",
        label: label,
    })
}

const MediaButton = (i: number = -1) => {
    return Widget.Button({
        class_name: "media-button",
        on_primary_click: () => mpris.players.at(i)?.playPause(),
        on_scroll_up: () => mpris.players.at(i)?.next(),
        on_scroll_down: () => mpris.players.at(i)?.previous(),
        child: MediaLabel(i),
    })
}

export default (i: number = -1) => {
    return MediaButton(i)
}
