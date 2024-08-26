(comm -23 <(pacman -Qqen | sort) <(sort ~/dotfiles/other-data/pkglist.md)) >> ~/dotfiles/other-data/pkglist.md
(comm -23 <(pacman -Qqem | sort) <(sort ~/dotfiles/other-data/aurlist.md)) >> ~/dotfiles/other-data/aurlist.md
