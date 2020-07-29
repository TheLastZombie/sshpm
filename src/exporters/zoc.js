module.exports = (cli, data) => {
  const path = require('path')
  const os = require('os')
  const fs = require('fs')

  const outZoc = path.resolve(os.homedir(), 'Documents', 'ZOC7 Files', 'Options', 'HostDirectory.zocini')
  if (!fs.existsSync(outZoc)) throw Error('ZOC configuration file does not exist')

  data.forEach(element => {
    let tempZoc = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'HostDirectory.zocini'), 'utf-8')
    let conf = fs.readFileSync(outZoc, 'utf-8')
    tempZoc = tempZoc
      .replace(/\$\(TIME\)/g, element.time)
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(PASS\)/g, element.pass || '')
      .replace(/\$\(KEY\)/g, element.key || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf.replace('[/DATA]', tempZoc + '\n\n[/DATA]')
    fs.writeFileSync(outZoc, conf)
  })
}
