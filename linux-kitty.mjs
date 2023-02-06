#!/usr/bin/env zx

const downloadsDirPath = os.homedir() + '/Downloads/';

async function updateOs() {
    await $`sudo add-apt-repository -y ppa:nrbrtx/xorg-hotkeys`
    await $`sudo apt update`

    await $`sudo pkcon -y update && sudo snap refresh && flatpak update -y`
}

async function installAptPackages() {
    const APT_APPS = [
        'mc',
        'zsh',
        'htop',
        'p7zip-full',
        'ncdu',
        'apt-transport-https',
        'ca-certificates',
        'software-properties-common',
        'chkrootkit',
        'rkhunter',
        'okteta',
        'golang-go',
        'gccgo',
        'pinta',
        'gocryptfs',
        'audacity',
        'obs-studio',
        'cpu-checker',
        'iotop',
        'qemu-kvm',
        'bridge-utils',
        'gnome-games',
        'pwgen',
        'adb',
        'gpp',
        'remmina',
        'remmina-plugin-rdp',
        'remmina-plugin-vnc',
        'virtualbox-ext-pack',
        'vlc',
        'inkscape',
        'glogg',
        'gpick',
        'hardinfo',
        'virtualbox-qt',
        'sqlitebrowser',
        'pgmodeler',
        'umbrello',
        'kamoso',
        'bleachbit',
        'gparted',
        'build-essential',
        'git',
        'docker-compose',
        'fonts-liberation',
        'filelight',
        'gimp',
        'kdenlive',
        'qtqr',
        'transmission-qt'
    ];

    await $`sudo apt install -y ${APT_APPS}`
}

async function installFlatpakPackages() {
    const APT_APPS = [
        'com.discordapp.Discord',
        'org.onlyoffice.desktopeditors',
        'rest.insomnia.Insomnia',
        'com.anydesk.Anydesk',
        'net.xmind.XMind8',
        'io.github.jordanl2.ModularCalculator',
        'md.obsidian.Obsidian',
        'org.flameshot.Flameshot',
        'com.jgraph.drawio.desktop',
        'com.github.tchx84.Flatseal',
        'com.valvesoftware.Steam',
        'com.visualstudio.code'
    ];

    await $`flatpak install -y ${APT_APPS}`
}

async function installSnapPackages() {
    const APT_APPS = [
        'code',
        'lunacy'
    ];

    await $`sudo snap install --classic ${APT_APPS}`
}

async function installWebStorm() {
    const response = await fetch('https://data.services.jetbrains.com/products/releases?code=WS&latest=true&type=release');
    const data = await response.json();
    const downloadUrl = data.WS[0].downloads.linux.link;
    await $`mkdir -p ${downloadsDirPath}`;
    const outputFilePath = downloadsDirPath + 'Webstorm.tar.gz';
    await $`wget ${downloadUrl} -O ${outputFilePath}`;
    const extractedDirPath = os.homedir() + '/Apps/Webstorm';
    await $`mkdir -p ${extractedDirPath}`;
    await $`tar -xzvf ${outputFilePath} -C ${extractedDirPath}`;
}

async function installDatagrip() {
    const response = await fetch('https://data.services.jetbrains.com/products/releases?code=DG&latest=true&type=release');
    const data = await response.json();
    const downloadUrl = data.DG[0].downloads.linux.link;
    await $`mkdir -p ${downloadsDirPath}`;
    const outputFilePath = downloadsDirPath + 'Datagrip.tar.gz';
    await $`wget ${downloadUrl} -O ${outputFilePath}`;
    const extractedDirPath = os.homedir() + '/Apps/Datagrip';
    await $`mkdir -p ${extractedDirPath}`;
    await $`tar -xzvf ${outputFilePath} -C ${extractedDirPath}`;
}

async function installPycharm() {
    const response = await fetch('https://data.services.jetbrains.com/products/releases?code=PCP&latest=true&type=release');
    const data = await response.json();
    const downloadUrl = data.PCP[0].downloads.linux.link;
    await $`mkdir -p ${downloadsDirPath}`;
    const outputFilePath = downloadsDirPath + 'PyCharm.tar.gz';
    await $`wget ${downloadUrl} -O ${outputFilePath}`;
    const extractedDirPath = os.homedir() + '/Apps/PyCharm';
    await $`mkdir -p ${extractedDirPath}`;
    await $`tar -xzvf ${outputFilePath} -C ${extractedDirPath}`;
}

async function installGoogleChrome() {
    const downloadUrl = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb';
    const outputFilePath = downloadsDirPath + 'google-chrome-stable_current_amd64.deb';
    await $`wget ${downloadUrl} -O ${outputFilePath}`;
    await $`sudo dpkg -i ${outputFilePath}`;
}

async function installTelegram() {
    const downloadUrl = 'https://telegram.org/dl/desktop/linux';
    const outputFilePath = downloadsDirPath + 'telegram.tar.xz';
    await $`wget ${downloadUrl} -O ${outputFilePath}`;
    const extractedDirPath = os.homedir() + '/Apps';
    await $`mkdir -p ${extractedDirPath}`;
    await $`tar -xvf ${outputFilePath} -C ${extractedDirPath}`;
}

async function printNotifications() {
    const fgColor = '#0d1b2a';
    const bgColor = '#ffd60a';
    let number = 1;
    const l = text => console.log(chalk.bgHex(bgColor)(chalk.hex(fgColor)(` ${number++}. ${text}`)));
    console.log('\n--------------------------------------------------');
    l('Login in Telegram');
    l('Login in Google Chrome');
    l('Add Flameshot to autostart');
    l('Bind PrnScr shortcut to Flameshot');
    l('Set ZSH default shell in Terminal App (like Konsole)');
    l('Install ublock origin: https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm');
    l('Install Chrome JSON viewer: https://chrome.google.com/webstore/detail/json-formatter/mhimpmpmffogbmmkmajibklelopddmjf');
    l('Hack Webstorm: https://jetbra.in/s');
    l('Hack Datagrip: https://jetbra.in/s');
    console.log('--------------------------------------------------');
}

async function installOhMyZsh() {
    await $`wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O - | zsh || true`;

    const zshrcFilePath = `${os.homedir()}/.zshrc`;
    const currentContent = fs.readFileSync(zshrcFilePath, 'utf-8');

    let newContent = currentContent.replace('ZSH_THEME="robbyrussell"', 'ZSH_THEME="agnoster"');

    const plugins = [
        'git', 
        'zsh-syntax-highlighting',
        'zsh-autosuggestions',
        'zsh-nvm'
    ];

    newContent = newContent.replace('plugins=(git)', `plugins=(${plugins.join(' ')})`);
    fs.writeFileSync(zshrcFilePath, newContent, 'utf-8');

    const SHELL_ALIASES = `
# ------- Linux Power Aliases -------
alias apt='sudo apt'
alias upd='sudo apt update && sudo pkcon -y update && sudo snap refresh && flatpak update -y'
alias dcc='docker-compose'
# -----------------------------------
`;
    fs.appendFileSync(zshrcFilePath, SHELL_ALIASES);
}

async function installOhMyZshPlugins() {
    await $`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`;
    await $`git clone https://github.com/zsh-users/zsh-autosuggestions \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`;
    await $`git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm`;
}
    

// await updateOs();
// await installAptPackages();
// await installFlatpakPackages();
// await installSnapPackages();

// await installOhMyZsh();
// await installOhMyZshPlugins();

// await installWebStorm();
// await installDatagrip(); //todo test
// await installPycharm(); //todo test

// await installGoogleChrome();
// await installTelegram();
await printNotifications();


// For SSD:
// max_inline=256,ssd,compress=lzo,ssd_spread,noatime,space_cache

// Disable intel turbo

// MAYBE
// Improve swap
// sudo echo "vm.swappiness = 10" >> /etc/sysctl.conf && sudo sysctl -p


// bash_aliases
//
// alias apt='sudo apt'
// alias upd='sudo apt update && sudo pkcon -y update && sudo snap refresh && flatpak update -y'
// alias dcc='docker-compose'


// notify to install Chrome apps: ublock origin...

