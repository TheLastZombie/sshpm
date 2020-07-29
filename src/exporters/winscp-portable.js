module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')
  const childProcess = require('child_process')

  if (!flags['winscp-conf']) throw Error('no WinSCP configuration file specified')
  const outWscp = path.resolve(flags['winscp-conf'])
  if (!fs.existsSync(outWscp)) throw Error('WinSCP configuration file does not exist')

  data.forEach(element => {
    if (element.key && !fs.readFileSync(element.key, 'utf-8').startsWith('PuTTY-User-Key-File')) {
      cli.log('Converting key... please close any appearing windows.')
      childProcess.spawn(flags['winscp-conf'].replace('winscp.ini', 'WinSCP.exe'), ['/keygen', element.key, '/output=' + element.key + '.ppk'])
    }
    let tempWscp = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'winscp.ini'), 'utf-8')
    let conf = fs.readFileSync(outWscp, 'utf-8')
    tempWscp = tempWscp
      .replace(/\$\(NAME\)/g, element.name.replace(/\s/g, '%20'))
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(PASS\)/g, element.pass || '')
      .replace(/\$\(KEY\)/g, element.key + '.ppk' || '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf + tempWscp
    fs.writeFileSync(outWscp, conf)
  })
}