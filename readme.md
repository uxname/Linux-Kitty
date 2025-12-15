![](logo.png)

# KDE Neon Ultimate Setup

## 🚀 Part 1: Installation Script

### 1. Repositories & System Update
```bash
# Add PPAs (Fish & Fastfetch)
sudo add-apt-repository -y ppa:fish-shell/release-3
sudo add-apt-repository -y ppa:zhangsongcui3371/fastfetch

# Update & Upgrade
sudo apt update && sudo apt full-upgrade -y
```

### 2. APT Packages
```bash
sudo apt install -y \
    # Shell & Modern Utils (Rust replacements)
    fish fastfetch trash-cli mc btop \
    fzf ripgrep fd-find bat eza zoxide plocate \
    # System & Utils
    muon kompare asciinema python3-pip sshpass p7zip-full \
    gdu apt-transport-https ca-certificates chkrootkit rkhunter iotop pwgen \
    bridge-utils build-essential git fonts-liberation filelight pv \
    wireguard resolvconf software-properties-qt \
    bleachbit gparted hardinfo glogg gpick duf tldr earlyoom \
    # Libraries (Video accel & Fonts)
    intel-media-va-driver-non-free libva-utils fontconfig \
    # Development (Libraries only, no languages)
    sqlitebrowser pgmodeler umbrello okteta \
    # Virtualization & Remote
    qemu-kvm adb remmina remmina-plugin-rdp remmina-plugin-vnc \
    virtualbox-qt virtualbox-ext-pack \
    # Media & Graphics
    elisa pinta gocryptfs audacity obs-studio vlc inkscape gimp \
    kdenlive kamoso qtqr transmission-qt handbrake cpu-checker webp \
    # Other
    gnome-games openjdk-21-jdk
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
# Google Chrome
wget 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb' -O /tmp/chrome.deb
sudo dpkg -i /tmp/chrome.deb && sudo apt install -f -y && rm /tmp/chrome.deb

# Visual Studio Code
wget 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64' -O /tmp/vscode.deb
sudo dpkg -i /tmp/vscode.deb && sudo apt install -f -y && rm /tmp/vscode.deb
```

### 5. Development Environment
```bash
# Docker (requires logout/login to apply)
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Volta (Node.js manager)
curl https://get.volta.sh | bash
volta install node
# Install Volta completions
$HOME/.volta/bin/volta completions fish > ~/.config/fish/completions/volta.fish

# Fisher (Plugin Manager)
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source
# Note: Removed 'z' in favor of zoxide, removed theme (use Starship below or stick to agnoster)
fisher install edc/bass oh-my-fish/theme-agnoster franciscolourenco/done danhper/fish-ssh-agent

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Starship Prompt (Modern alternative to agnoster, optional)
curl -sS https://starship.rs/install.sh | sh -s -- -y
```

### 6. System Tweaks (Performance & UI)
```bash
# 1. Disable Baloo (File Indexer) to save CPU/Disk
balooctl6 disable || balooctl disable
balooctl6 purge || balooctl purge

# 2. Fix Font Rendering (MacOS style)
mkdir -p ~/.config/fontconfig
cat <<EOF > ~/.config/fontconfig/fonts.conf
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'fonts.dtd'>
<fontconfig>
 <match target="font">
  <edit mode="assign" name="rgba"><const>rgb</const></edit>
  <edit mode="assign" name="hinting"><bool>true</bool></edit>
  <edit mode="assign" name="hintstyle"><const>hintslight</const></edit>
  <edit mode="assign" name="antialias"><bool>true</bool></edit>
  <edit mode="assign" name="lcdfilter"><const>lcddefault</const></edit>
 </match>
</fontconfig>
EOF
fc-cache -fv

# 3. Hide snap directory
echo snap >> ~/.hidden
```

---

## 🔧 Part 2: Manual Configuration

### 1. Fish Config (`~/.config/fish/config.fish`)

```fish
set -g fish_greeting

# ─── Tools Initialization ─────────────────────────────────────────────────────
# Initialize Zoxide (Better 'cd')
if type -q zoxide
    zoxide init fish | source
end

# Initialize Starship (Prompt) - Uncomment if installed
# starship init fish | source

# ─── Aliases ──────────────────────────────────────────────────────────────────
# Modern Replacements
alias ls="eza --icons"
alias ll="eza -alF --icons --git"
alias tree="eza --tree --icons"
alias cat="bat"
alias grep="rg"
alias find="fd"
alias top="btop"
alias df="duf"

# Shortcuts
alias dcc="docker compose"
alias apt="sudo apt"
alias 7za='7z a -t7z -m0=lzma -mx=9 -mfb=64 -md=32m -ms=on'
alias nest="npx nest"
alias gm="bun $HOME/Work/gm/index.ts"
alias lazy="bun examples/chat-paster.ts"
alias tarzip="tar -czvf"
alias untarzip="tar -xzvf"
alias webp-all="convert_images_to_webp"

# Trash-cli safety
if type -q trash-put
    alias rm="trash-put"
else
    alias rm="rm -i"
end

# ─── Functions ────────────────────────────────────────────────────────────────
function upd --description 'Update & clean all system packages'
    echo "--> Updating APT..."
    sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
    
    if type -q snap
        echo "--> Refreshing Snaps..."
        sudo snap refresh
    end
    
    if type -q flatpak
        echo "--> Updating Flatpaks..."
        flatpak update -y
    end
    
    if type -q rustup
        echo "--> Updating Rust..."
        rustup update
    end
    
    echo "✅ System update complete."
end

function dclean --description 'DANGER: Stop and remove ALL docker containers'
    set -l containers (docker ps -aq)
    if test -z "$containers"
        echo "No containers to clean."
        return 0
    end
    echo "You are about to stop and delete ALL Docker containers:"
    docker ps -a
    read -l -P "Are you sure? (y/N) " confirm
    if string match -iq y $confirm
        docker kill $containers
        docker rm $containers
        echo "Cleanup done."
    else
        echo "Cancelled."
    end
end

function convert_images_to_webp --description "Convert images in current dir to WebP"
    set -l images (find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \))
    if test -z "$images"
        echo "No images found."
        return 1
    end
    for img in $images
        set new_img (string replace -r '\.[^.]+$' '.webp' $img)
        echo "Converting $img -> $new_img"
        if cwebp -quiet $img -o $new_img
            rm $img
        else
            echo "Error converting $img"
        end
    end
end
```

### 2. Post-Install Checklist

#### Application Installation & Setup
- [ ] **JetBrains IDEs:** Install via [Toolbox App](https://www.jetbrains.com/toolbox-app/) (recommended over manual download).
  - WebStorm, DataGrip, PyCharm, GoLand.
- [ ] **Telegram Desktop:** https://desktop.telegram.org/
- [ ] **Login:** Telegram, Chrome, Bitwarden.
- [ ] **Activate JetBrains:** https://jetbra.in/s

#### System Configuration (Performance)
- [ ] **fstab:** Remove `discard` option from SSD mount points.
- [ ] **Swappiness:** Set `vm.swappiness=10` or `5`.
- [ ] **Inotify:** Increase watchers for WebStorm (`fs.inotify.max_user_watches = 524288`).
- [ ] **Konsole:** Set Fish as default shell. Enable "Blur" background if using transparent theme.
- [ ] **Autostart:** Add Flameshot.
- [ ] **Shortcuts:** Bind `PrtScn` to `flameshot gui`.

#### KDE Plasma Tweaks
- [ ] **General Behavior:** Animation Speed -> "Instant" (or near instant).
- [ ] **KWin:** Enable "BorderlessMaximizedWindows" in `~/.config/kwinrc`.
- [ ] **Virtual Desktops:** Create 3 desktops, Animation "Slide". Use 4-finger swipe.
- [ ] **Keyboard:** Delay 220ms, Rate 40-50 reps/s.
- [ ] **Search:** Disable Baloo (File Search), enable only Apps & Calculator.
- [ ] **Night Color:** Enable.
