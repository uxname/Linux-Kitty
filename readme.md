![](logo.png)

## Description

Script to install and configure software on a fresh KDE Neon.

## Usage

# Bash scripts

```bash
sudo add-apt-repository -y ppa:nrbrtx/xorg-hotkeys
sudo apt-add-repository ppa:fish-shell/release-3
sudo add-apt-repository ppa:zhangsongcui3371/fastfetch
sudo apt update
sudo pkcon -y update && sudo snap refresh && flatpak update -y

curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
fisher install jorgebucaran/fisher fabioantunes/fish-nvm edc/bass oh-my-fish/theme-agnoster jethrokuan/z franciscolourenco/done danhper/fish-ssh-agent

sudo apt install -y fastfetch fish trash-cli mc muon kompare elisa asciinema zram-config python3-pip htop sshpass p7zip-full gdu apt-transport-https ca-certificates chkrootkit rkhunter okteta golang-go gccgo pinta gocryptfs audacity obs-studio cpu-checker iotop qemu-kvm bridge-utils gnome-games pwgen adb gpp remmina remmina-plugin-rdp remmina-plugin-vnc virtualbox-ext-pack vlc inkscape glogg gpick hardinfo virtualbox-qt sqlitebrowser pgmodeler umbrello kamoso bleachbit gparted build-essential git docker-compose fonts-liberation filelight gimp kdenlive qtqr transmission-qt pv handbrake flameshot laptop-mode-tools wireguard resolvconf software-properties-qt openjdk-17-jdk

flatpak install -y org.localsend.localsend_app in.srev.guiscrcpy com.discordapp.Discord org.onlyoffice.desktopeditors rest.insomnia.Insomnia com.anydesk.Anydesk com.viber.Viber net.xmind.XMind io.github.jordanl2.ModularCalculator md.obsidian.Obsidian org.flameshot.Flameshot com.jgraph.drawio.desktop com.github.tchx84.Flatseal com.valvesoftware.Steam

sudo snap install bitwarden ngrok

echo snap >> ~/.hidden
curl -sSL get.docker.com | sh
sudo usermod -aG docker $USER
npm config set legacy-peer-deps true

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

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
    ```
    alias dcc="docker-compose"
    alias apt='sudo apt'
    alias upd='sudo apt update && sudo pkcon -y update && sudo snap refresh && flatpak update -y'
    alias 7za='7z a -t7z -m0=lzma -mx=9 -mfb=64 -md=32m -ms=on'
    alias docker-clean='docker kill (docker ps -aq) && docker rm (docker ps -aq)'
    alias ccat='batcat'
    alias rm='trash'
  
    function convert_images_to_webp
      for img in *.jpg *.jpeg *.png *.gif *.bmp; 
          set new_img (string replace -r '\.(jpg|jpeg|png|gif|bmp)$' '.webp' $img); 
          cwebp $img -o $new_img; 
          rm $img; 
      end
    end

    alias webp-all='convert_images_to_webp'
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

---

# KDE Keymap (keymap.kksrc)

```
[ActivityManager][Global Shortcuts]
switch-to-activity-d767af29-49b5-41c5-b51a-06881352c7d0=

[KDE Keyboard Layout Switcher][Global Shortcuts]
Switch keyboard layout to English (US)=
Switch keyboard layout to Russian=
Switch to Next Keyboard Layout=Ctrl+Alt+K

[StandardShortcuts]
AboutApp=
AboutKDE=
Activate Next Tab=Ctrl+]; Ctrl+PgDown
Activate Previous Tab=Ctrl+[; Ctrl+PgUp
ActualSize=Ctrl+0
AddBookmark=Ctrl+B
Back=Alt+Left; Back
BackwardWord=Ctrl+Left
Begin=Ctrl+Home
BeginningOfLine=Home
Clear=
Close=Ctrl+W; Ctrl+Esc
ConfigureNotifications=
ConfigureToolbars=
Copy=Ctrl+Ins; Ctrl+C
CreateFolder=F10
Cut=Shift+Del; Ctrl+X
DeleteFile=Shift+Del
DeleteWordBack=Ctrl+Backspace
DeleteWordForward=Ctrl+Del
Deselect=Ctrl+Shift+A
DocumentBack=Alt+Shift+Left
DocumentForward=
Donate=
EditBookmarks=
End=Ctrl+End
EndOfLine=End
Find=Ctrl+F
FindNext=F3
FindPrev=Shift+F3
FitToHeight=
FitToPage=
FitToWidth=
Forward=Forward; Alt+Right
ForwardWord=Ctrl+Right
FullScreen=Ctrl+Shift+F
Goto=
GotoLine=Ctrl+G
GotoPage=
Help=F1
Home=Home Page; Alt+Home
KeyBindings=
Mail=
MoveToTrash=Del
New=Ctrl+N
Next=PgDown
NextCompletion=Ctrl+Down
Open=Ctrl+O
OpenRecent=
Paste=Ctrl+V; Shift+Ins
Paste Selection=Ctrl+Shift+Ins
Preferences=Ctrl+Shift+,
PrevCompletion=Ctrl+Up
Print=Ctrl+P
PrintPreview=
Prior=PgUp
Quit=Ctrl+Q
Redo=Ctrl+Shift+Z
Reload=Refresh; F5
RenameFile=F2
Replace=Ctrl+R
ReportBug=
Revert=
RotateDown=Down
RotateUp=Up
Save=Ctrl+S
SaveAs=Ctrl+Shift+S
SaveOptions=
SelectAll=Ctrl+A
ShowHideHiddenFiles=Ctrl+H; Alt+.
ShowMenubar=Ctrl+M
ShowStatusbar=
ShowToolbar=
Spelling=
SubstringCompletion=Ctrl+T
SwitchApplicationLanguage=
TextCompletion=Ctrl+E
TipofDay=
Undo=Ctrl+Z
Up=Alt+Up
WhatsThis=Shift+F1
Zoom=
ZoomIn=Ctrl+=; Ctrl++
ZoomOut=Ctrl+-

[kaccess][Global Shortcuts]
Toggle Screen Reader On and Off=Meta+Alt+S

[kcm_touchpad][Global Shortcuts]
Disable Touchpad=Touchpad Off
Enable Touchpad=Touchpad On
Toggle Touchpad=Touchpad Toggle

[kded5][Global Shortcuts]
Show System Activity=Ctrl+Esc
display=Display; Meta+P

[khotkeys][Global Shortcuts]
{d03619b6-9b3c-48cc-9d9c-a2aadb485550}=

[kmix][Global Shortcuts]
decrease_microphone_volume=Microphone Volume Down
decrease_volume=Volume Down
increase_microphone_volume=Microphone Volume Up
increase_volume=Volume Up
mic_mute=Meta+Volume Mute; Microphone Mute
mute=Volume Mute

[ksmserver][Global Shortcuts]
Halt Without Confirmation=
Lock Session=Meta+L; Screensaver
Log Out=Ctrl+Alt+Del
Log Out Without Confirmation=
Reboot Without Confirmation=

[kwin][Global Shortcuts]
Activate Window Demanding Attention=
ClearLastMouseMark=Meta+Shift+F12
ClearMouseMarks=Meta+Shift+F11
Decrease Opacity=
Edit Tiles=Meta+T
Expose=
ExposeAll=Ctrl+F10; Launch (C)
ExposeClass=Ctrl+F7
ExposeClassCurrentDesktop=
Increase Opacity=
Invert Screen Colors=
Kill Window=Ctrl+Alt+Esc
MoveMouseToCenter=Meta+F6
MoveMouseToFocus=Meta+F5
MoveZoomDown=
MoveZoomLeft=
MoveZoomRight=
MoveZoomUp=
Overview=Meta+W
Setup Window Shortcut=
Show Desktop=Meta+D
ShowDesktopGrid=Ctrl+F8
Suspend Compositing=Alt+Shift+F12
Switch One Desktop Down=
Switch One Desktop Up=
Switch One Desktop to the Left=
Switch One Desktop to the Right=
Switch Window Down=Meta+Alt+Down
Switch Window Left=Meta+Alt+Left
Switch Window Right=Meta+Alt+Right
Switch Window Up=Meta+Alt+Up
Switch to Desktop 1=
Switch to Desktop 10=
Switch to Desktop 11=
Switch to Desktop 12=
Switch to Desktop 13=
Switch to Desktop 14=
Switch to Desktop 15=
Switch to Desktop 16=
Switch to Desktop 17=
Switch to Desktop 18=
Switch to Desktop 19=
Switch to Desktop 2=
Switch to Desktop 20=
Switch to Desktop 3=
Switch to Desktop 4=
Switch to Desktop 5=
Switch to Desktop 6=
Switch to Desktop 7=
Switch to Desktop 8=
Switch to Desktop 9=
Switch to Next Desktop=Ctrl+Alt+Right
Switch to Next Screen=
Switch to Previous Desktop=Ctrl+Alt+Left
Switch to Previous Screen=
Switch to Screen 0=
Switch to Screen 1=
Switch to Screen 2=
Switch to Screen 3=
Switch to Screen 4=
Switch to Screen 5=
Switch to Screen 6=
Switch to Screen 7=
Switch to Screen Above=
Switch to Screen Below=
Switch to Screen to the Left=
Switch to Screen to the Right=
Toggle=
Toggle Night Color=
Toggle Window Raise/Lower=
ToggleMouseClick=Meta+*
Walk Through Desktop List=
Walk Through Desktop List (Reverse)=
Walk Through Desktops=
Walk Through Desktops (Reverse)=
Walk Through Windows=Alt+Tab
Walk Through Windows (Reverse)=Alt+Shift+Backtab
Walk Through Windows Alternative=
Walk Through Windows Alternative (Reverse)=
Walk Through Windows of Current Application=Alt+`
Walk Through Windows of Current Application (Reverse)=Alt+~
Walk Through Windows of Current Application Alternative=
Walk Through Windows of Current Application Alternative (Reverse)=
Window Above Other Windows=
Window Below Other Windows=
Window Close=Alt+F4
Window Fullscreen=
Window Grow Horizontal=
Window Grow Vertical=
Window Lower=
Window Maximize=Meta+Up
Window Maximize Horizontal=
Window Maximize Vertical=
Window Minimize=Meta+Down
Window Move=
Window Move Center=
Window No Border=
Window On All Desktops=
Window One Desktop Down=Meta+Ctrl+Shift+Down
Window One Desktop Up=Meta+Ctrl+Shift+Up
Window One Desktop to the Left=Meta+Ctrl+Shift+Left
Window One Desktop to the Right=Meta+Ctrl+Shift+Right
Window One Screen Down=
Window One Screen Up=
Window One Screen to the Left=
Window One Screen to the Right=
Window Operations Menu=Alt+F3
Window Pack Down=
Window Pack Left=
Window Pack Right=
Window Pack Up=
Window Quick Tile Bottom=
Window Quick Tile Bottom Left=
Window Quick Tile Bottom Right=
Window Quick Tile Left=Meta+Left
Window Quick Tile Right=Meta+Right
Window Quick Tile Top=
Window Quick Tile Top Left=
Window Quick Tile Top Right=
Window Raise=
Window Resize=
Window Shade=
Window Shrink Horizontal=
Window Shrink Vertical=
Window to Desktop 1=
Window to Desktop 10=
Window to Desktop 11=
Window to Desktop 12=
Window to Desktop 13=
Window to Desktop 14=
Window to Desktop 15=
Window to Desktop 16=
Window to Desktop 17=
Window to Desktop 18=
Window to Desktop 19=
Window to Desktop 2=
Window to Desktop 20=
Window to Desktop 3=
Window to Desktop 4=
Window to Desktop 5=
Window to Desktop 6=
Window to Desktop 7=
Window to Desktop 8=
Window to Desktop 9=
Window to Next Desktop=Ctrl+Alt+Shift+Right
Window to Next Screen=
Window to Previous Desktop=Ctrl+Alt+Shift+Left
Window to Previous Screen=Meta+Shift+Left
Window to Screen 0=
Window to Screen 1=
Window to Screen 2=
Window to Screen 3=
Window to Screen 4=
Window to Screen 5=
Window to Screen 6=
Window to Screen 7=
view_actual_size=
view_zoom_in=Meta+=
view_zoom_out=Meta+-

[mediacontrol][Global Shortcuts]
mediavolumedown=
mediavolumeup=
nextmedia=Media Next
pausemedia=Media Pause
playmedia=
playpausemedia=Media Play
previousmedia=Media Previous
stopmedia=Media Stop

[org.flameshot.Flameshot.desktop][Global Shortcuts]
Capture=Print
Configure=
Launcher=
_launch=

[org.kde.dolphin.desktop][Global Shortcuts]
_launch=Meta+E

[org.kde.konsole.desktop][Global Shortcuts]
NewTab=
NewWindow=
_launch=Ctrl+Alt+T

[org.kde.krunner.desktop][Global Shortcuts]
RunClipboard=Alt+Shift+F2
_launch=Alt+F2; Alt+Space; Search

[org.kde.plasma.emojier.desktop][Global Shortcuts]
_launch=Meta+.

[org.kde.spectacle.desktop][Global Shortcuts]
ActiveWindowScreenShot=Meta+Print
CurrentMonitorScreenShot=
FullScreenScreenShot=Shift+Print
OpenWithoutScreenshot=
RectangularRegionScreenShot=Meta+Shift+Print
WindowUnderCursorScreenShot=Meta+Ctrl+Print
_launch=

[org_kde_powerdevil][Global Shortcuts]
Decrease Keyboard Brightness=Keyboard Brightness Down
Decrease Screen Brightness=Monitor Brightness Down
Hibernate=Hibernate
Increase Keyboard Brightness=Keyboard Brightness Up
Increase Screen Brightness=Monitor Brightness Up
PowerDown=Power Down
PowerOff=Power Off
Sleep=Sleep
Toggle Keyboard Backlight=Keyboard Light On/Off
Turn Off Screen=

[plasmashell][Global Shortcuts]
activate task manager entry 1=Meta+1
activate task manager entry 10=Meta+0
activate task manager entry 2=Meta+2
activate task manager entry 3=Meta+3
activate task manager entry 4=Meta+4
activate task manager entry 5=Meta+5
activate task manager entry 6=Meta+6
activate task manager entry 7=Meta+7
activate task manager entry 8=Meta+8
activate task manager entry 9=Meta+9
activate widget 27=
activate widget 3=Alt+F1
clear-history=
clipboard_action=Ctrl+Alt+X
cycle-panels=Meta+Alt+P
cycleNextAction=
cyclePrevAction=
edit_clipboard=
manage activities=Meta+Q
next activity=Meta+Tab
previous activity=Meta+Shift+Tab
repeat_action=Ctrl+Alt+R
show dashboard=Ctrl+F12
show-barcode=
show-on-mouse-pos=Meta+V
stop current activity=Meta+S
switch to next activity=
switch to previous activity=
toggle do not disturb=

[systemsettings.desktop][Global Shortcuts]
_launch=Tools
kcm-kscreen=
kcm-lookandfeel=
kcm-users=
powerdevilprofilesconfig=
screenlocker=
```
