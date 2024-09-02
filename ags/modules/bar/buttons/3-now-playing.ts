const mpris = await Service.import("mpris")

const NowPlaying = () => { 
    const visible = Variable(false)

    const player = mpris.getPlayer("cider")
    var initLabel = "Nothing is Playing"

    if (player) {
        const { track_artists, track_title } = player

        visible.value = true
        initLabel = `${track_title} ${track_artists.length !== 0 ? "by" : ""} ${track_artists[0] ?? ""}`.trim()
    }

    var label = Utils.watch(initLabel, mpris, () => {
        const player = mpris.getPlayer("cider")
        
        if (player !== null) {
            const { track_artists, track_title } = player

            visible.value = true
            return `${track_title} ${track_artists.length !== 0 ? "by" : ""} ${track_artists[0] ?? ""}`.trim()
        } else {
            visible.value = false
            return "Nothing is playing"
        }
    })

    return Widget.EventBox({
        child: Widget.Label({
            label: label,
            className: "now-playing",
            visible: visible.bind(),
        }),
        on_primary_click(self, event) {
            const width = self.get_allocated_size()[0].width
            if (event.get_coords()[1] < 50) {
                mpris.getPlayer("cider")?.previous()
            } else if (event.get_coords()[1] > width - 50) {
                mpris.getPlayer("cider")?.next()
            } else {
                mpris.getPlayer("cider")?.playPause()
            }
        },
    })
}

export default () => {
    return NowPlaying()
}
