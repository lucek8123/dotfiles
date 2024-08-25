const date = Variable("", {
    poll: [1000, 'date "+%H:%M:%S %b"'],
})

export default () => {
    return Widget.Label({
        className: "time",
        label: date.bind()
    })
}
