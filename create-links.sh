#!/usr/bin/env bash

for dir in $PWD/*; do 
    if [ -d $dir ]; then 
        symlinkpath=~/.config/$(basename "$dir")

        if ! [ -e $symlinkpath ]; then
            # symlink dont exist, create it
            ln -s $dir ~/.config
            echo "DEBUG: created $symlinkpath"
        else 
            if ! [ -L $symlinkpath ]; then
                echo "ERROR: ~/.config/$(basename $dir) exists and is not a symlink"
            else 
                if [ "$(readlink -f "$symlinkpath")" != "$(readlink -f "$dir")" ]; then 
                    echo "ERROR: $symlinkpath links to $(readlink -f $symlinkpath) which is not a symlink of $dir"
                else 
                    echo "DEBUG: $symlinkpath links to $dir"
                fi;
            fi;
        fi;
    fi;
done
