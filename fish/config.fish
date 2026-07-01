if status is-interactive
    # Commands to run in interactive sessions can go here
    zoxide init fish | source
    thefuck --alias | source 
    # clear
    # cat ~/.local/state/caelestia/sequences.txt 2> /dev/null
    fastfetch
end
