# sshpm

sshpm allows you to use a single set of SSH connection profiles across multiple SSH-related programs.

[![Jest](https://github.com/TheLastZombie/sshpm/actions/workflows/jest.yml/badge.svg)](https://github.com/TheLastZombie/sshpm/actions/workflows/jest.yml) [![Super-Linter](https://github.com/TheLastZombie/sshpm/actions/workflows/super-linter.yml/badge.svg)](https://github.com/TheLastZombie/sshpm/actions/workflows/super-linter.yml)

## Installation

<details>

<summary>Using NPM</summary>

```Bash
npm i -g sshpm
```

</details>

<details>

<summary>Using PNPM</summary>

```Bash
pnpm i -g sshpm
```

</details>

<details>

<summary>Using Yarn</summary>

```Bash
yarn global add sshpm
```

</details>

<details>

<summary>Manually</summary>

Download the [latest release](https://github.com/TheLastZombie/sshpm/releases/latest), extract it and add the `bin` directory to your PATH.

</details>

<details>

<summary>From source</summary>

```Bash
git clone https://github.com/TheLastZombie/sshpm
cd sshpm
npm i
```

To run sshpm without compiling, use `npm start --` instead of `sshpm` (i.e. `npm start -- help`).

To compile sshpm, run the distribution script:

```Bash
npm run dist
```

After that, you'll (hopefully) find what you need inside the `dist` directory.

</details>

<details>

<summary>Using Scoop</summary>

If you use Scoop but don't want to install Node.js, you can also use my bucket to install sshpm:

```Bash
scoop bucket add tlz https://github.com/TheLastZombie/scoop-bucket
scoop install sshpm
```

</details>

<details>

<summary>With NPX</summary>

If you have NPM installed, you can also prepend all commands with `npx` (i.e. `npx sshpm help`).

Keep in mind that this will use a temporary instead of a permanent installation, significantly increasing execution time, since NPX will download sshpm every time a command is run.

</details>

## Usage

To show general help regarding sshpm, run `sshpm` or `sshpm help`.

To show help for a specific command, run `sshpm help [COMMAND]` or `sshpm [COMMAND] --help`.

The commands themselves are pretty self-explanatory, and a typical workflow might look like this:

```Bash
sshpm init
sshpm login "Server 1" -h example.com -o 22 -u username -p password
sshpm login "Server 2" -h example.com -o 22 -u username -k id_rsa
sshpm test "Server 1"
sshpm list
sshpm apply
```

## Programs

The following programs are currently supported:

|                                                              | Name | Host | Port | User | Password | Key |
| :----------------------------------------------------------: | :--: | :--: | :--: | :--: | :------: | :-: |
| [Cyberduck](https://cyberduck.io/)                           | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [electerm](https://electerm.github.io/electerm/)             | ✕    | ✕    | ✕    | ✕    | ✕        |     |
| [FileZilla](https://filezilla-project.org/)                  | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [KiTTY](https://9bis.net/kitty/#!index.md)                   | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [mRemoteNG](https://mremoteng.org/)                          | ✕    | ✕    | ✕    | ✕    |          |     |
| [OpenSSH](https://www.openssh.com/)                          | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [rclone](https://rclone.org/)                                | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [Remmina](https://remmina.org/)                              | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [WinSCP](https://winscp.net/)                                | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [WinSCP Portable](https://winscp.net/)                       | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [ZOC Terminal](https://www.emtec.com/zoc/)                   | ✕    | ✕    | ✕    | ✕    |          | ✕   |
