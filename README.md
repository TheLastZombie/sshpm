# spm

spm allows you to use a single set of SSH connection profiles across multiple SSH-related programs.

## Installation

```
git clone https://github.com/TheLastZombie/spm
cd spm
npm install
npm run dist
```

Now simply extract the archive for your OS (placed in `dist`) and add the `bin` directory within it to your PATH.

## Usage

To show general help regarding spm, run `spm` or `spm help`.

To show help for a specific command, run `spm help [COMMAND]` or `spm [COMMAND] --help`.

The commands themselves are pretty self-explanatory, and a typical workflow might look like this:

```
spm init
spm login "Server 1" -h example.com -p 22 -u username -p password
spm login "Server 2" -h example.com -p 22 -u username -k id_rsa
spm test "Server 1"
spm list
spm apply
```

## Programs

The following programs are currently supported:

- [OpenSSH](https://www.openssh.com/) (unstable: key files may not work)
- [WinSCP Portable](https://winscp.net/) (unstable: key  conversion requires interaction)
- [ZOC Terminal](https://www.emtec.com/zoc/) (unstable: encoding can mess up)
