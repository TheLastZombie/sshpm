module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outSsh
  switch (process.platform) {
    case 'win32':
    case 'linux':
      outSsh = path.resolve(cli.config.home, '.ssh', 'config')
      break
    default:
      if (!flags.conf) {
        throw Error(
          'could not reliably determine configuration location, please use -c'
        )
      }
      break
  }

  if (flags.conf) outSsh = path.resolve(flags.conf)
  if (flags.init) {
    if (!fs.existsSync(path.dirname(outSsh))) {
      fs.mkdirSync(path.dirname(outSsh))
    }
    fs.openSync(outSsh, 'a')
  }
  if (!fs.existsSync(outSsh)) {
    throw Error('OpenSSH configuration file does not exist')
  }

  if (!flags.keep) {
    let conf = fs.readFileSync(outSsh, 'utf-8')
    conf = conf
      .split('\r\n\r\n')
      .filter((x) => !x.match(/Host ".*".*# sshpm\//s))
      .join('\r\n\r\n')
    fs.writeFileSync(outSsh, conf)
  }

  data.forEach((element) => {
    let tempSsh = fs.readFileSync(
      path.resolve(__dirname, '..', 'assets', 'config'),
      'utf-8'
    )
    let conf = fs.readFileSync(outSsh, 'utf-8')
    tempSsh = tempSsh
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(VERSION\)/g, cli.config.version)
    if (element.key) {
      tempSsh = tempSsh.replace(/\$\(KEY\)/g, element.key)
    } else {
      tempSsh = tempSsh.replace(/\s{4}IdentityFile \$\(KEY\)/g, '')
    }
    conf = conf + '\r\n' + tempSsh
    fs.writeFileSync(outSsh, conf)
  })
}
