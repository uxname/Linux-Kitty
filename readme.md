![](logo.png)

# KDE Neon Setup

## 🚀 Part 1: Installation Script

### 1. Repositories & System Update
```bash
# Add PPAs
sudo add-apt-repository -y ppa:nrbrtx/xorg-hotkeys
sudo add-apt-repository -y ppa:fish-shell/release-3
sudo add-apt-repository -y ppa:zhangsongcui3371/fastfetch

# Update & Upgrade
sudo apt update && sudo apt full-upgrade -y
```

### 2. APT Packages
```bash
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
    gnome-games openjdk-17-jdk
```

### 3. Flatpak & Snap Packages
```bash
# Flatpak
flatpak update -y
flatpak install -y com.anydesk.Anydesk com.discordapp.Discord \
    com.github.tchx84.Flatseal com.jgraph.drawio.desktop com.valvesoftware.Steam \
    com.viber.Viber in.srev.guiscrcpy io.github.jordanl2.ModularCalculator \
    md.obsidian.Obsidian net.xmind.XMind org.localsend.localsend_app \
    org.onlyoffice.desktopeditors rest.insomnia.Insomnia

# Snap
sudo snap refresh
sudo snap install bitwarden ngrok
```

### 4. External `.deb` Packages
```bash
# Google Chrome: https://www.google.com/chrome/
wget 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb' -O /tmp/chrome.deb
sudo dpkg -i /tmp/chrome.deb && sudo apt install -f -y && rm /tmp/chrome.deb

# Visual Studio Code: https://code.visualstudio.com/
wget 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64' -O /tmp/vscode.deb
sudo dpkg -i /tmp/vscode.deb && sudo apt install -f -y && rm /tmp/vscode.deb
```

### 5. Development Environment
```bash
# Docker (requires logout/login to apply)
curl -sSL https://get.docker.com | sh
sudo usmod -aG docker $USER

# Fisher & plugins
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
fisher install jorgebucaran/nvm.fish edc/bass oh-my-fish/theme-agnoster jethrokuan/z franciscolourenco/done danhper/fish-ssh-agent

# Rust (press Enter for default installation)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# NPM
npm config set legacy-peer-deps true
```

### 6. Final Touches
```bash
# Hide snap directory from home
echo snap >> ~/.hidden
```

---

## 🔧 Part 2: Manual Configuration

### 1. Fish Config (`~/.config/fish/config.fish`)

```fish
set -g fish_greeting

# ─── Aliases ──────────────────────────────────────────────────────────────────
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

if type -q trash-put
    alias rm="trash-put"
else
    alias rm="rm -i"
end

# ─── Functions ────────────────────────────────────────────────────────────────
function upd --description 'Update & clean all system packages'
    sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
    command -v snap >/dev/null && echo "--> Refreshing Snaps..." && sudo snap refresh
    command -v flatpak >/dev/null && echo "--> Updating Flatpaks..." && flatpak update -y
    echo "✅ System update complete."
end

function dclean --description 'DANGER: Stop and remove ALL docker containers'
    set -l containers (docker ps -aq)
    if test -z "$containers"; echo "No containers to clean."; return 0; end
    echo "You are about to stop and delete ALL Docker containers:"; docker ps -a
    read -l -P "Are you sure? (y/N) " confirm
    if string match -iq y $confirm; docker kill $containers; docker rm $containers; else; echo "Cancelled."; end
end

function convert_images_to_webp --description "Convert images in current dir to WebP"
    set -l images (find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \))
    if test -z "$images"; echo "No images found."; return 1; end
    for img in $images
        set new_img (string replace -r '\.[^.]+$' '.webp' $img)
        echo "Converting $img -> $new_img"
        if cwebp -quiet $img -o $new_img; rm $img; else; echo "Error converting $img"; end
    end
end
```

### 2. Post-Install Checklist

#### Application Installation & Setup
- [ ] **JetBrains IDEs:**
    - WebStorm: https://www.jetbrains.com/webstorm/
    - DataGrip: https://www.jetbrains.com/datagrip/
    - PyCharm: https://www.jetbrains.com/pycharm/
    - GoLand: https://www.jetbrains.com/go/
- [ ] **Telegram Desktop:** https://desktop.telegram.org/
- [ ] **Login:** Telegram, Chrome, Bitwarden.
- [ ] **Activate JetBrains:** https://jetbra.in/s

#### Chrome Extensions
- [ ] **uBlock Origin:** https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm
- [ ] **JSON Formatter:** https://chrome.google.com/webstore/detail/json-formatter/mhimpmpmffogbmmkmajibklelopddmjf
- [ ] **Bitwarden:** https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb

#### System Configuration
- [ ] **Konsole:** Set Fish as default shell.
- [ ] **Autostart:** Add Flameshot.
- [ ] **Shortcuts:** Bind `PrtScn` to `flameshot gui`.
- [ ] **Dolphin:** Add "Open as Root", set default path to `~`.
- [ ] **System Settings:**
    - [ ] Set Chrome as default browser.
    - [ ] Plasma Search: Enable only Applications, Calculator, Command line, Unit Converter, System settings.
    - [ ] Disable file search (Baloo).
    - [ ] Enable Night Color.
    - [ ] Add Russian keyboard layout, set indicator to flag.
    - [ ] Keyboard repeat: Delay 250ms, Rate 50 reps/s.
    - [ ] Add virtual desktops.
    - [ ] *Optional:* `sudo apt remove zram-config`.
- [ ] **VirtualBox:** Download Guest Additions ISO.
- [ ] **JetBrains Plugins:** Install `Windsurf`, `Prisma`, `GraphQL`, `Plant UML`, `Copilot`, `.env files support`, `.ignore`, `GitToolBox`, `React snippets`, `React buddy`.