#!/usr/bin/env bash

homeDir=/home/shadow

(comm -23 <(pacman -Qqen | sort) <(sort $homeDir/dotfiles/other-data/pkglist.md)) >> $homeDir/dotfiles/other-data/pkglist.md
(comm -23 <(pacman -Qqem | sort) <(sort $homeDir/dotfiles/other-data/aurlist.md)) >> $homeDir/dotfiles/other-data/aurlist.md
