# sshpm

sshpm allows you to use a single set of SSH connection profiles across multiple SSH-related programs.

## Installation

### Using NPM

```
npm i -g sshpm
```

### Manually

Download the [latest release](https://github.com/TheLastZombie/sshpm/releases/latest), extract it and add the `bin` directory to your PATH.

### From source

```
git clone https://github.com/TheLastZombie/sshpm
cd sshpm
npm i
npm run dist
```

After that, you'll (hopefully) find what you need inside the `dist` directory.

### Using Scoop

If you use Scoop but don't want to install Node.js, you can also use my bucket to install sshpm:

```
scoop bucket add tlz https://github.com/TheLastZombie/scoop-bucket
scoop install sshpm
```

### With NPX

If you have NPM installed, you can also prepend all commands with `npx` (i.e. `npx sshpm help`).

Keep in mind that this will use a temporary instead of a permanent installation, significantly increasing execution time, since NPX will download sshpm every time a command is run.

## Usage

To show general help regarding sshpm, run `sshpm` or `sshpm help`.

To show help for a specific command, run `sshpm help [COMMAND]` or `sshpm [COMMAND] --help`.

The commands themselves are pretty self-explanatory, and a typical workflow might look like this:

```
sshpm init
sshpm login "Server 1" -h example.com -o 22 -u username -p password
sshpm login "Server 2" -h example.com -o 22 -u username -k id_rsa
sshpm test "Server 1"
sshpm list
sshpm apply
```

## Programs

The following programs are currently supported:

- [OpenSSH](https://www.openssh.com/) (unstable: PuTTY key files may not work)
- [WinSCP Portable](https://winscp.net/) (unstable: key conversion requires interaction)
- [ZOC Terminal](https://www.emtec.com/zoc/)
