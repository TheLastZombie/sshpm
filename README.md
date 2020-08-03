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

## Usage

To show general help regarding sshpm, run `sshpm` or `sshpm help`.

To show help for a specific command, run `sshpm help [COMMAND]` or `sshpm [COMMAND] --help`.

The commands themselves are pretty self-explanatory, and a typical workflow might look like this:

```
sshpm init
sshpm login "Server 1" -h example.com -p 22 -u username -p password
sshpm login "Server 2" -h example.com -p 22 -u username -k id_rsa
sshpm test "Server 1"
sshpm list
sshpm apply
```

## Programs

The following programs are currently supported:

- [OpenSSH](https://www.openssh.com/) (unstable: key files may not work)
- [WinSCP Portable](https://winscp.net/) (unstable: key conversion requires interaction)
- [ZOC Terminal](https://www.emtec.com/zoc/) (unstable: encoding can mess up)
