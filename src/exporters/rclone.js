module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')
  const childProcess = require('child_process')
  const pathRClone = require('rclone-bin').pathRClone

  var outRcl = path.resolve(cli.config.home, '.config', 'rclone', 'rclone.conf')
  if (flags.conf) outRcl = path.resolve(flags.conf)
  if (!fs.existsSync(outRcl)) throw Error('rclone configuration file does not exist')

  if (!flags.keep) {
    let conf = fs.readFileSync(outRcl, 'utf-8')
    conf = conf
      .split('\r\n\r\n')
      .filter(x => !x.match(/sshpm = /s))
      .join('\r\n\r\n')
    fs.writeFileSync(outRcl, conf)
  }

  data.forEach(element => {
    var pass
    if (element.pass) pass = childProcess.spawnSync(flags.exec || pathRClone, ['obscure', element.pass], { encoding: 'utf-8' }).output[1].trim()
    let tempRcl = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'rclone.conf'), 'utf-8')
    let conf = fs.readFileSync(outRcl, 'utf-8')
    tempRcl = tempRcl
      .replace(/\$\(NAME\)/g, element.name)
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(PASS\)/g, pass || '')
      .replace(/\$\(KEY\)/g, element.key || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf + '\r\n' + tempRcl
    fs.writeFileSync(outRcl, conf)
  })
}
