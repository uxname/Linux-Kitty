# Windows Dev Environment Setup

### 1. Package Managers & Repositories
```powershell
# Install Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Add Buckets
scoop bucket add extras
scoop bucket add nerd-fonts
scoop bucket add java

# Update Winget
winget install -e --id Microsoft.AppInstaller
```

### 2. Core Toolset
```powershell
# CLI Utilities & Fonts
scoop install git 7zip fastfetch btop eza zoxide gdu topgrade fzf starship JetBrainsMono-NF msys2

# GUI Applications
scoop install googlechrome webstorm vscode telegram vlc windows-terminal discord wiztree bruno

# Runtimes & System
scoop install volta
volta install node
winget install -e --id Docker.DockerDesktop
winget install -e --id WireGuard.WireGuard
```

### 3. Shell Enhancement (PowerShell Profile)
Install **PSReadLine** for Fish-like history/autocompletion:
```powershell
Install-Module -Name PSReadLine -AllowPrerelease -Force -Scope CurrentUser
```

Configure your profile (`notepad $PROFILE`):
```powershell
# Initialization
Invoke-Expression (&starship init powershell)
Invoke-Expression (&zoxide init powershell)

# PSReadLine Predictor & Keybinds
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key "RightArrow" -Function AcceptNextSuggestionWord
```

Install fish shell: `pacman -S fish`
