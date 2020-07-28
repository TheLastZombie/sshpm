const { Command, flags } = require('@oclif/command')

class ApplyCommand extends Command {
  async run () {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file))

    // WinSCP Portable
    // TODO: Convert key file to PuTTY format

    const { flags } = this.parse(ApplyCommand)

    const outWscp = path.resolve(flags['winscp-ini'])
    if (!fs.existsSync(outWscp)) throw Error('WinSCP configuration file does not exist')

    data.forEach(element => {
      let tempWscp = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'winscp.ini'), 'utf-8')
      let conf = fs.readFileSync(outWscp, 'utf-8')
      tempWscp = tempWscp
        .replace(/\$\(NAME\)/g, element.name.replace(/\s/g, '%20'))
        .replace(/\$\(HOST\)/g, element.host)
        .replace(/\$\(PORT\)/g, element.port)
        .replace(/\$\(USER\)/g, element.user)
        .replace(/\$\(PASS\)/g, element.pass || '')
        .replace(/\$\(KEY\)/g, element.key || '')
      conf = conf + tempWscp
      fs.writeFileSync(outWscp, conf)
    })

    // ZOC7 Terminal

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
      conf = conf.replace('[/DATA]', tempZoc + '\n\n[/DATA]')
      fs.writeFileSync(outZoc, conf)
    })
  }
}

ApplyCommand.description = 'send profiles to programs'

ApplyCommand.flags = {
  'winscp-ini': flags.string({ char: 'w', description: 'WinSCP portable configuration file', required: true })
}

module.exports = ApplyCommand
