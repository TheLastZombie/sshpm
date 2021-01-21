module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outRem
  switch (process.platform) {
    case 'linux':
      outRem = path.resolve(cli.config.home, '.local', 'share', 'remmina')
      break
    default:
      if (!flags.conf) throw Error('could not reliably determine configuration location, please use -c')
      break
  }

  if (flags.conf) outRem = path.resolve(flags.conf)
  if (flags.init && !fs.existsSync(outRem)) fs.mkdirSync(outRem)
  if (!fs.existsSync(outRem)) throw Error('Remmina configuration directory does not exist')

  if (!flags.keep) {
    fs.readdirSync(outRem).forEach(file => {
      const conf = fs.readFileSync(path.resolve(outRem, file), 'utf-8')
      if (conf.match(/\[remmina\]/) && conf.match(/sshpm=/)) fs.unlinkSync(path.resolve(outRem, file))
    })
  }

  data.forEach(element => {
    let tempRem = fs.readFileSync(path.resolve(__dirname, '..', 'assets', '1.remmina'), 'utf-8')
    tempRem = tempRem
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(VERSION\)/g, cli.config.version)
      .replace(/\$\(TYPE\)/g, (element.key ? 1 : 0))
    if (element.key) {
      tempRem = tempRem.replace(/\$\(KEY\)/g, element.key)
    } else {
      tempRem = tempRem.replace(/ssh_privatekey=\$\(KEY\)/g, '')
    }
    fs.writeFileSync(path.resolve(outRem, element.time + '.remmina'), tempRem)
  })
}
