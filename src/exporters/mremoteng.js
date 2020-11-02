module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')

  let outMrng = path.resolve(cli.config.home, 'AppData', 'Roaming', 'mRemoteNG', 'confCons.xml')
  if (flags.conf) outMrng = path.resolve(flags.conf)
  if (flags.init) throw Error('mRemoteNG does not support automatically creating configuration files')
  if (!fs.existsSync(outMrng)) throw Error('mRemoteNG configuration file does not exist')

  if (!flags.keep) {
    let conf = fs.readFileSync(outMrng, 'utf-8')
    conf = conf
      .split('\r\n')
      .filter(x => !x.match(/Descr="sshpm\//))
      .join('\r\n')
    fs.writeFileSync(outMrng, conf)
  }

  data.forEach(element => {
    let tempMrng = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'confCons.xml'), 'utf-8')
    let conf = fs.readFileSync(outMrng, 'utf-8')
    tempMrng = tempMrng
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf.replace('</mrng:Connections>', tempMrng + '</mrng:Connections>')
    fs.writeFileSync(outMrng, conf)
  })
}
