#!/usr/bin/env bash

sleep 1

lidState=$(cat /proc/acpi/button/lid/LID0/state)

if [[ $lidState == *"open"* ]]; then
    hyprctl keyword monitor "eDP-1, enable"  
else 
    hyprctl keyword monitor "eDP-1, disable"
fi
