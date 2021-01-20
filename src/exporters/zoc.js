module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')
  const iconv = require('iconv-lite')

  let outZoc = path.resolve(cli.config.home, 'Documents', 'ZOC8 Files', 'Options', 'HostDirectory.zhd')
  if (flags.conf) outZoc = path.resolve(flags.conf)
  if (flags.init) {
    if (!fs.existsSync(path.dirname(outZoc))) fs.mkdirSync(path.dirname(outZoc))
    fs.writeFileSync(outZoc, 'ZOC\n[DATA]\n[/DATA]')
  }
  if (!fs.existsSync(outZoc)) throw Error('ZOC configuration file does not exist')
  if (fs.readFileSync(outZoc, 'utf-8').includes('\nCrypto=')) throw Error('ZOC configuration file is encrypted and, as such, not supported')

  if (!flags.keep) {
    let conf = iconv.decode(fs.readFileSync(outZoc), 'iso-8859-1')
    conf = conf
      .split('\r\n\r\n')
      .filter(x => !x.match(/\[HOST\].*memo="sshpm\//s))
      .join('\r\n\r\n')
    fs.writeFileSync(outZoc, iconv.encode(conf, 'iso-8859-1'))
  }

  data.forEach(element => {
    let tempZoc = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'HostDirectory.zhd'), 'utf-8')
    let conf = iconv.decode(fs.readFileSync(outZoc), 'iso-8859-1')
    tempZoc = tempZoc
      .replace(/\$\(TIME\)/g, element.time)
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(KEY\)/g, element.key || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf.replace('[/DATA]', tempZoc + '\r\n[/DATA]')
    fs.writeFileSync(outZoc, iconv.encode(conf, 'iso-8859-1'))
  })
}
