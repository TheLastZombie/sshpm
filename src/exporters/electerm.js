module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outElec
  switch (process.platform) {
    case 'win32':
      outElec = path.resolve(cli.config.home, 'AppData', 'Roaming', 'electerm', 'users', 'default_user', 'electerm.bookmarks.nedb')
      break
    default:
      if (!flags.conf) throw Error('could not reliably determine configuration location, please use -c')
      break
  }

  if (flags.conf) outElec = path.resolve(flags.conf)
  if (flags.init) {
    if (!fs.existsSync(path.dirname(outElec))) fs.mkdirSync(path.dirname(outElec))
    fs.openSync(outElec, 'a')
  }
  if (!fs.existsSync(outElec)) throw Error('electerm configuration file does not exist')

  if (!flags.keep) {
    let conf = fs.readFileSync(outElec, 'utf-8')
    conf = conf
      .split('\r\n')
      .filter(x => !x.match(/"sshpm":"/))
      .join('\r\n')
    fs.writeFileSync(outElec, conf)
  }

  data.forEach(element => {
    let tempElec = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'electerm.bookmarks.nedb'), 'utf-8')
    let conf = fs.readFileSync(outElec, 'utf-8')
    tempElec = tempElec
      .replace(/\$\(TIME\)/g, element.time)
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(PASS\)/g, element.pass || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    if (element.key) {
      tempElec = tempElec.replace(/"authType":"password"/g, '"authType":"privateKey"')
    }
    conf = conf + tempElec
    fs.writeFileSync(outElec, conf)
  })
}
