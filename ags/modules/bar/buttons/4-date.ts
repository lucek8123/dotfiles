const hour = Variable("", {
    poll: [1000, 'date "+%H"'],
})

const minute = Variable("", {
    poll: [1000, 'date "+%M"'],
})

export default () => {
    return Widget.Box({
        className: "date",
        vertical: true,
        children: [
            Widget.Label({
                className: "date-hour",
                label: hour.bind()
            }),
            Widget.Label({
                className: "date-minute",
                label: minute.bind()
            })
        ]
    })
}
