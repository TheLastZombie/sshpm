const { Command } = require('@oclif/command')

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

    /* ZOC7 Terminal ************************************************************/

    const out = path.resolve(os.homedir(), 'Documents', 'ZOC7 Files', 'Options', 'HostDirectory.zocini')
    if (!fs.existsSync(out)) throw Error('ZOC configuration file does not exist')

    data.forEach(element => {
      let temp = fs.readFileSync(path.resolve(__dirname, '..', 'assets', 'HostDirectory.zocini'), 'utf-8')
      let conf = fs.readFileSync(out, 'utf-8')
      temp = temp
        .replace(/\$\(TIME\)/g, element.time)
        .replace(/\$\(NAME\)/g, element.name)
        .replace(/\$\(HOST\)/g, element.host)
        .replace(/\$\(PORT\)/g, element.port)
        .replace(/\$\(USER\)/g, element.user)
        .replace(/\$\(PASS\)/g, element.pass || '')
        .replace(/\$\(KEY\)/g, element.key || '')
      conf = conf.replace('[/DATA]', temp + '\n\n[/DATA]')
      fs.writeFileSync(out, conf)
    })
  }
}

ApplyCommand.description = 'send profiles to programs'

module.exports = ApplyCommand
