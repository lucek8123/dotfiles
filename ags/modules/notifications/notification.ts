import { Notification } from "types/service/notifications"

const notifications = await Service.import("notifications")

const NotificationIcon = (n: Notification) => {
    if (n.image) {
        return Widget.Box({
            css: `background-image: url("${n.image}");`
                + "background-size: contain;"
                + "background-repeat: no-repeat;"
                + "background-position: center;",
        })
    }

    let icon = "dialog-information-symbolic"
    if (Utils.lookUpIcon(n.app_icon))
        icon = n.app_icon

    if (n.app_entry && Utils.lookUpIcon(n.app_entry))
        icon = n.app_entry

    return Widget.Box({
        vpack: "start",
        class_name: "notification-icon",
        child: Widget.Icon(icon),
    })
}

function NotificationBox(n: Notification) {
    const title = Widget.Label({
        class_name: "notification-title",
        xalign: 0,
        justification: "left",
        hexpand: true,
        max_width_chars: 24,
        truncate: "end",
        wrap: true,
        label: n.summary,
        use_markup: true,
    })

    const body = Widget.Label({
        class_name: "notification-body",
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        label: n.body,
        wrap: true,
    })

    const NotificationActions = () => {
        return Widget.Box({
            class_name: "actions",
            children: n.actions.map(action => {
                return Widget.Button({
                    class_name: "notification-action-button",
                    on_clicked: () => {
                        n.invoke(action.id)
                        n.dismiss()
                    },
                    hexpand: true,
                    child: Widget.Label({label: action.label }),
                })
            })
        })
    }

    return Widget.EventBox({
        attribute: { id: n.id },
        on_primary_click: n.dismiss,
        child: Widget.Box({
            class_name: `notification ${n.urgency}`,
            vertical: true,
            children: [
                Widget.Box([
                    NotificationIcon(n),
                    Widget.Box(
                        { vertical: true },
                        title,
                        body,
                    ),
                ]),
                NotificationActions(),
            ]
        }),
    })
}

export default (monitor: number = 0) => {
    const list = Widget.Box({
        vertical: true,
        children: notifications.popups.map(NotificationBox),
        setup: (self) => {
            self.hook(notifications, onNotified, "notified")
            self.hook(notifications, onDismissed, "dismissed")
        }
    })

    function onNotified(_: any, id: number) {
        const n = notifications.getNotification(id)
        if (n) {
            list.children = [NotificationBox(n), ...list.children]
            print(list.children.length)
        }
    }

    function onDismissed(_: any, id: number) {
        list.children.find(n => n.attribute.id === id)?.destroy()
    }

    return Widget.Window({
        name: `notifications${monitor}`,
        className: "notifications-popups",
        anchor: ["top", "right"],
        child: Widget.Box({
            className: "notifications",
            vertical: true,
            child: list
        })
    })
}
