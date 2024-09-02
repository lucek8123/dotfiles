const date = Variable("", {
    poll: [1000, 'date "+%a, %d %b  %H:%M"'],
})

export default () => {
    return Widget.Label({
        className: "date",
        label: date.bind()
    })
}
