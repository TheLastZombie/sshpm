module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outFza
  switch (process.platform) {
    case 'win32':
      outFza = path.resolve(
        cli.config.home,
        'AppData',
        'Roaming',
        'FileZilla',
        'sitemanager.xml'
      )
      break
    case 'linux':
      outFza = path.resolve(
        cli.config.home,
        '.config',
        'filezilla',
        'sitemanager.xml'
      )
      break
    default:
      if (!flags.conf) {
        throw Error(
          'could not reliably determine configuration location, please use -c'
        )
      }
      break
  }

  if (flags.conf) outFza = path.resolve(flags.conf)
  if (flags.init) {
    if (!fs.existsSync(path.dirname(outFza))) {
      fs.mkdirSync(path.dirname(outFza))
    }
    fs.writeFileSync(
      outFza,
      '<?xml version="1.0"?>\n<FileZilla3>\n<Servers>\n</Servers>\n</FileZilla3>'
    )
  }
  if (!fs.existsSync(outFza)) {
    throw Error('FileZilla configuration file does not exist')
  }

  if (!flags.keep) {
    let conf = fs.readFileSync(outFza, 'utf-8')
    conf = conf
      .split('>\n\t\t<')
      .filter((x) => !x.match(/ \| sshpm\//))
      .join('>\n\t\t<')
      .replace(/<Servers>\n(\t\t<\/Server>\n)+/, '<Servers>\n')
    fs.writeFileSync(outFza, conf)
  }

  data.forEach((element) => {
    let tempFza = fs.readFileSync(
      path.resolve(__dirname, '..', 'assets', 'sitemanager.xml'),
      'utf-8'
    )
    let conf = fs.readFileSync(outFza, 'utf-8')
    tempFza = tempFza
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(
        /\$\(PASS\)/g,
        Buffer.from(element.pass).toString('base64') || ''
      )
      .replace(/\$\(KEY\)/g, element.key || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
      .replace(/\$\(TYPE\)/g, element.key ? 5 : 1)
    conf = conf
      .replace('<Servers />', '<Servers></Servers>')
      .replace('</Servers>', tempFza + '</Servers>')
    fs.writeFileSync(outFza, conf)
  })
}
