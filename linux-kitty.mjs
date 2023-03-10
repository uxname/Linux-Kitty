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
        'asciinema',
        'zram-config',
        'python3-pip',
        'htop',
        'sshpass',
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
        'com.viber.Viber',
        'net.xmind.XMind',
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
    l('Install Chrome BitWarden: https://chrome.google.com/webstore/detail/nngceckbapebfimnlniiiahkandclblb');
    l('Download VirtualBox Guest Additions disk image');
    l('Hack Webstorm: https://jetbra.in/s');
    l('Hack Datagrip: https://jetbra.in/s');
    // todo goland
    l('Hack PyCharm: https://jetbra.in/s');
    l('Setup Plasma Search, leave only: Applications, Calculator, Command line, Unit Converter');
    l('Replace task manager panel with alternative');
    l('Add russian keyboard');
    l('Add open as root to Dolphin');
    l('Add several virtual desktops');
    l('Import shortcuts from https://gist.github.com/uxname/d2287dedda6313068e8eebf27c29d8b0');
    l('Add Webstorm plugins: T-Sol / Solidity, Prisma, GraphQL, Plant UML Integration, Copilot, .env files support, .ignore, GitToolBox, React snippets, React buddy');
    l('Optional: sudo apt remove zram-config')

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

async function tuneOs() {
    // Hide ~/snap directory via adding it to the list of hidden directories (~/.hidden)
    await $`touch ${os.homedir()}/.hidden`;
    fs.appendFileSync(`${os.homedir()}/.hidden`, 'snap\n');

    // Make docker work without sudo
    await $`sudo usermod -aG docker $USER`;

    await $`npm config set legacy-peer-deps true`;

    // todo Disable intel turbo
}

await updateOs();
await installAptPackages();
await installFlatpakPackages();
await installSnapPackages();

await installOhMyZsh();
await installOhMyZshPlugins();

await installWebStorm();
await installDatagrip(); //todo test
await installPycharm(); //todo test

await installGoogleChrome();
await installTelegram();

await printNotifications();

await tuneOs();


