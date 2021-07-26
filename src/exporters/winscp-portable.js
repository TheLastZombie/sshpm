module.exports = (cli, data, flags) => {
  const path = require('path')
  const fs = require('fs')
  const childProcess = require('child_process')

  const pathWinSCP = path.resolve(cli.config.dataDir, 'WinSCP.com')

  let outWscp
  switch (process.platform) {
    default:
      if (!flags.conf) {
        throw Error(
          'could not reliably determine configuration location, please use -c'
        )
      }
      break
  }

  if (flags.conf) outWscp = path.resolve(flags.conf)
  if (flags.init) {
    if (!fs.existsSync(path.dirname(outWscp))) {
      fs.mkdirSync(path.dirname(outWscp))
    }
    fs.openSync(outWscp, 'a')
  }
  if (!fs.existsSync(outWscp)) {
    throw Error('WinSCP configuration file does not exist')
  }

  if (!flags.keep) {
    let conf = fs.readFileSync(outWscp, 'utf-8')
    conf = conf
      .split('\r\n\r\n')
      .filter((x) => !x.match(/\[Sessions\\.*?\]\r\nSshpm=/))
      .join('\r\n\r\n')
    fs.writeFileSync(outWscp, conf)
  }

  data.forEach((element) => {
    if (element.key) {
      childProcess.spawn(flags.exec || pathWinSCP, [
        '/keygen',
        element.key,
        '/output=' + element.key + '.ppk'
      ])
    }
    let tempWscp = fs.readFileSync(
      path.resolve(__dirname, '..', 'assets', 'winscp.ini'),
      'utf-8'
    )
    let conf = fs.readFileSync(outWscp, 'utf-8')
    tempWscp = tempWscp
      .replace(/\$\(NAME\)/g, encodeURIComponent(element.name))
      .replace(/\$\(HOST\)/g, element.host)
      .replace(/\$\(PORT\)/g, element.port)
      .replace(/\$\(USER\)/g, element.user)
      .replace(/\$\(PASS\)/g, element.pass || '')
      .replace(/\$\(KEY\)/g, element.key ? element.key + '.ppk' : '')
      .replace(/\$\(VERSION\)/g, cli.config.version)
    conf = conf + tempWscp
    fs.writeFileSync(outWscp, conf)
  })
}
