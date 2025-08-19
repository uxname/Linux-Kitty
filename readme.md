![](logo.png)

## Description

Script to install and configure software on a fresh KDE Neon.

## Usage

### Part 1: Bash Script

```bash
# 1. Repositories & System Update
# Add all PPAs first to be included in the initial update.
sudo add-apt-repository -y ppa:nrbrtx/xorg-hotkeys
sudo apt-add-repository -y ppa:fish-shell/release-3
sudo add-apt-repository -y ppa:zhangsongcui3371/fastfetch

# A single command to update all system packages.
sudo apt update && sudo apt full-upgrade -y


# 2. APT Packages
# Packages are listed line-by-line for better readability and maintenance.
sudo apt install -y \
    # Shell & Terminal
    fastfetch fish trash-cli mc htop \
    # System & Utils
    muon kompare asciinema zram-config python3-pip sshpass p7zip-full \
    gdu apt-transport-https ca-certificates chkrootkit rkhunter iotop pwgen \
    bridge-utils build-essential git fonts-liberation filelight pv \
    laptop-mode-tools wireguard resolvconf software-properties-qt \
    bleachbit gparted hardinfo glogg gpick \
    # Development
    nodejs npm golang-go gccgo sqlitebrowser pgmodeler umbrello okteta \
    # Virtualization & Remote
    qemu-kvm adb remmina remmina-plugin-rdp remmina-plugin-vnc \
    virtualbox-qt virtualbox-ext-pack \
    # Media & Graphics
    elisa pinta gocryptfs audacity obs-studio vlc inkscape gimp \
    kdenlive kamoso qtqr transmission-qt handbrake cpu-checker \
    # Other
    gnome-games \
    openjdk-17-jdk


# 3. Flatpak & Snap Packages
flatpak update -y
flatpak install -y \
    org.localsend.localsend_app \
    in.srev.guiscrcpy \
    com.discordapp.Discord \
    org.onlyoffice.desktopeditors \
    rest.insomnia.Insomnia \
    com.anydesk.Anydesk \
    com.viber.Viber \
    net.xmind.XMind \
    io.github.jordanl2.ModularCalculator \
    md.obsidian.Obsidian \
    com.jgraph.drawio.desktop \
    com.github.tchx84.Flatseal \
    com.valvesoftware.Steam

sudo snap refresh
sudo snap install bitwarden ngrok


# 4. Development Environment Setup
# Install Docker
curl -sSL get.docker.com | sh
# Note: A logout/login is required for Docker permissions to apply.
sudo usermod -aG docker $USER

# Install Fisher for Fish Shell
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
fisher install jorgebucaran/nvm.fish edc/bass oh-my-fish/theme-agnoster jethrokuan/z franciscolourenco/done danhper/fish-ssh-agent

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Configure NPM
npm config set legacy-peer-deps true


# 5. Final Touches
# Hide the snap directory from the home folder
echo snap >> ~/.hidden
```

### Part 2: Manual Configuration

# Links

- https://chrome.com/
- https://code.visualstudio.com/docs/?dv=linux64_deb
- https://www.jetbrains.com/webstorm/
- https://www.jetbrains.com/datagrip/
- https://www.jetbrains.com/pycharm/
- https://www.jetbrains.com/go/
- https://desktop.telegram.org/
- https://anydesk.com/en/downloads/linux?dv=deb_64

- nano `~/.config/fish/config.fish`:
    ```fish
    # Disable fish greeting
    set -g fish_greeting
  
    # ─── Aliases ────────────────────────────────────────
    alias dcc="docker compose"
    alias apt="sudo apt"
    alias 7za='7z a -t7z -m0=lzma -mx=9 -mfb=64 -md=32m -ms=on'
    alias nest="npx nest"
    alias gm="bun $HOME/Work/gm/index.ts"
    alias lazy="bun examples/chat-paster.ts"
    alias ll="ls -alFh --color=auto"
    alias tarzip="tar -czvf"
    alias untarzip="tar -xzvf"
    alias webp-all="convert_images_to_webp"

    if type -q trash
        alias rm="trash"
    else
        echo "⚠️ 'trash-cli' not found. Using rm -i (interactive mode)."
        alias rm="rm -i"
    end
    
    # ─── Function: Update packages ────────────────────────────────────────────────
    function upd --description 'Update system packages (APT, Snap, Flatpak)'
    sudo apt update
    sudo apt full-upgrade -y
    
        if type -q snap
            echo "--> Refreshing Snaps..."
            sudo snap refresh
        end
    
        if type -q flatpak
            echo "--> Updating Flatpaks..."
            flatpak update -y
        end
    
        echo "✅ System update complete."
    end
    
    # ─── Function: Remove all Docker containers ───────────────────────────────────
    function dclean --description 'Danger: Stop and remove ALL docker containers'
    set -l containers (docker ps -aq)
    if test -z "$containers"
    echo "No containers to clean."
    return 0
    end
    
        echo "You are about to stop and delete ALL Docker containers:"
        docker ps -a
        read -l -P "Are you sure you want to proceed? (y/N) " confirm
    
        if string match -iq y $confirm
            echo "Stopping and removing containers..."
            docker kill $containers
            docker rm $containers
        else
            echo "Operation cancelled."
        end
    end
    
    # ─── Function: Convert images to WebP ─────────────────────────────────────────
    function convert_images_to_webp --description "Convert all images in the current directory to WebP"
    set -l images (find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \))
    if test -z "$images"
    echo "No images found to convert."
    return 1
    end
    
        for img in $images
            set new_img (string replace -r '\.[^.]+$' '.webp' $img)
            echo "Converting $img -> $new_img"
            if cwebp -quiet $img -o $new_img
                rm $img
            else
                echo "Error converting $img. Original file preserved."
            end
        end
    end
    ```
---

- Login in Telegram
- Login in Google Chrome
- Add Flameshot to autostart
- Bind PrnScr shortcut to Flameshot
- Set Fish default shell in Terminal App (like Konsole)
- Install ublock origin: https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm
- Install Chrome JSON viewer: https://chrome.google.com/webstore/detail/json-formatter/mhimpmpmffogbmmkmajibklelopddmjf
- Install Chrome BitWarden: https://chrome.google.com/webstore/detail/nngceckbapebfimnlniiiahkandclblb
- Download VirtualBox Guest Additions disk image
- Hack Jetbrains: https://jetbra.in/s
- Switch Jetbrains to Windows keymap
- Setup Plasma Search, leave only: Applications, Calculator, Command line, Unit Converter, System settings
- Disable KDE file search
- Replace task manager panel with alternative
- Enable night color
- Add russian keyboard
- Switch keyboard indicator to flag
- Change keyboard delay and rate to: 250ms, 50 repeat/s
- Add open as root to Dolphin
- Set home dir as default in Doplhin
- Set Chrome Default browser
- Add several virtual desktops
- Add Webstorm plugins: T-Sol / Solidity, Prisma, GraphQL, Plant UML Integration, Copilot, .env files support, .ignore, GitToolBox, React snippets, React buddy
- Optional: sudo apt remove zram-config
