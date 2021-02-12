module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outCdk
  switch (process.platform) {
    case 'win32':
      outCdk = path.resolve(cli.config.home, 'AppData', 'Roaming', 'Cyberduck', 'Bookmarks')
      break
    default:
      if (!flags.conf) throw Error('could not reliably determine configuration location, please use -c')
      break
  }

  if (flags.conf) outCdk = path.resolve(flags.conf)
  if (flags.init && !fs.existsSync(outCdk)) fs.mkdirSync(outCdk)
  if (!fs.existsSync(outCdk)) throw Error('Cyberduck configuration directory does not exist')

  if (!flags.keep) {
    fs.readdirSync(outCdk).forEach(file => {
      const conf = fs.readFileSync(path.resolve(outCdk, file), 'utf-8')
      if (conf.match(/<plist version=".*">/) && conf.match(/sshpm\//)) fs.unlinkSync(path.resolve(outCdk, file))
    })
  }

  data.forEach(element => {
    let tempCdk = fs.readFileSync(path.resolve(__dirname, '..', 'assets', '1.duck'), 'utf-8')
    tempCdk = tempCdk
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(KEY\)/g, element.key)
      .replace(/\$\(TIME\)/g, element.time)
      .replace(/\$\(VERSION\)/g, cli.config.version)
    fs.writeFileSync(path.resolve(outCdk, element.time + '.duck'), tempCdk)
  })
}
