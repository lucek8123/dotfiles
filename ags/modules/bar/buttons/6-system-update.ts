const UpdateIcon = () => {
    const updateLabel = Variable("", {
        poll: [43200, "bash -c 'yay -Qu | wc -l'"]
    }).bind().transform(num => {
        return Number(num) == 0 ? `󰞑` : ` ${num}`
    })

    return Widget.Label({
        label: updateLabel,
        className: "update-icon"
   })
}

export default () => {
    return UpdateIcon()
}
