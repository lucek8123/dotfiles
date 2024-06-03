#!/usr/bin/env bash

lidState=$(cat /proc/acpi/button/lid/LID0/state)

if [[ $lidState == *"open"* ]]; then
    hyprctl keyword monitor "eDP-1, enable"  
else 
    # Check if it has one monitor (if its not docked) - then you can suspend
    if [[ $(hyprctl monitors all | grep Monitor -c) == "1" ]]; then
        hyprctl keyword monitor "eDP-1, enable"  
        systemctl suspend
    else 
        # disable monitor 
        hyprctl keyword monitor "eDP-1, disable"
    fi;
fi
