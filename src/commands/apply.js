const { Command, flags } = require('@oclif/command')

class ApplyCommand extends Command {
  async run () {
    const { args, flags } = this.parse(ApplyCommand)

    const os = require('os')
    const path = require('path')
    const fs = require('fs')
    const childProcess = require('child_process')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file))

    if (args.program === 'winscp-portable') {
      if (!flags['winscp-conf']) throw Error('no WinSCP configuration file specified')
      const outWscp = path.resolve(flags['winscp-conf'])
      if (!fs.existsSync(outWscp)) throw Error('WinSCP configuration file does not exist')

      data.forEach(element => {
        if (element.key && !fs.readFileSync(element.key, 'utf-8').startsWith('PuTTY-User-Key-File')) {
          this.log('Converting key... please close any appearing windows.')
          childProcess.spawn('winscp', ['/keygen', element.key, '/output=' + element.key + '.ppk'])
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
        conf = conf + tempWscp
        fs.writeFileSync(outWscp, conf)
      })
    }

    if (args.program === 'zoc') {
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
}

ApplyCommand.description = 'send profiles to programs'

ApplyCommand.args = [
  { name: 'program', description: 'program to send profiles to', required: true, options: ['winscp-portable', 'zoc'] }
]

ApplyCommand.flags = {
  'winscp-conf': flags.string({ char: 'w', description: 'WinSCP portable configuration file' })
}

module.exports = ApplyCommand
