# sshpm

sshpm allows you to use a single set of SSH connection profiles across multiple SSH-related programs.

## Installation

<details>

<summary>Using NPM</summary>

```
npm i -g sshpm
```

</details>

<details>

<summary>Using PNPM</summary>

```
pnpm i -g sshpm
```

</details>

<details>

<summary>Using Yarn</summary>

```
yarn global add sshpm
```

</details>

<details>

<summary>Manually</summary>

Download the [latest release](https://github.com/TheLastZombie/sshpm/releases/latest), extract it and add the `bin` directory to your PATH.

</details>

<details>

<summary>From source</summary>

```
git clone https://github.com/TheLastZombie/sshpm
cd sshpm
npm i
npm run dist
```

After that, you'll (hopefully) find what you need inside the `dist` directory.

</details>

<details>

<summary>Using Scoop</summary>

If you use Scoop but don't want to install Node.js, you can also use my bucket to install sshpm:

```
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

|                                                              | Name | Host | Port | User | Password | Key |
| :----------------------------------------------------------: | :--: | :--: | :--: | :--: | :------: | :-: |
| [mRemoteNG](https://mremoteng.org/)                          | ✕    | ✕    | ✕    | ✕    |          |     |
| [OpenSSH](https://www.openssh.com/)                          | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) | ✕    | ✕    | ✕    | ✕    |          | ✕   |
| [rclone](https://rclone.org/)                                | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [WinSCP](https://winscp.net/)                                | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [WinSCP Portable](https://winscp.net/)                       | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
| [ZOC Terminal](https://www.emtec.com/zoc/)                   | ✕    | ✕    | ✕    | ✕    | ✕        | ✕   |
