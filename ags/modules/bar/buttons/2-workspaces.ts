const hyprland = await Service.import("hyprland")

const WorkspaceButton = (buttonNumber: number) => {
    const activeId = hyprland.active.workspace.bind("id")

    const ButtonLabel = () => {
        return Widget.Label({
            class_names: activeId.as(i => [i === buttonNumber ? "active" : "", "workspaceLabel"]),
            label: `${buttonNumber}`
        })
    }
        
    return Widget.EventBox({
        className: "workspaceButton",
        onPrimaryClick: () => hyprland.messageAsync(`dispatch workspace ${buttonNumber}`),
        child: ButtonLabel(),
        vexpand: false,
    })
}

export default () => {
    // const workspaces = hyprland.bind("workspaces").transform(wsArr => {
    //     const lastWorkspace = wsArr.at(-1)!.id
    //
    //     console.log(lastWorkspace)
    //     return Array.from(Array(lastWorkspace), (_, i) => WorkspaceButton(i + 1))
    // })

    const workspaces = Array.from(Array(5), (_, i) => WorkspaceButton(i + 1))

    return Widget.Box({
        spacing: 5,
        className: "workspaces",
        children: workspaces,
    })
}
