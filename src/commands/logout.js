const { Command, flags } = require('@oclif/command')

class LogoutCommand extends Command {
  async run () {
    const { args, flags } = this.parse(LogoutCommand)

    const path = require('path')
    const fs = require('fs')

    let dir, file
    if (flags.use) {
      dir = path.dirname(flags.use)
      file = path.resolve(dir, path.basename(flags.use))
    } else {
      dir = this.config.configDir
      file = path.resolve(dir, 'config.json')
    }

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    let data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (!data.map(x => x.name).includes(args.name)) throw Error('specified profile not found')
    data = data.filter(x => x.name !== args.name)

    fs.writeFileSync(file, JSON.stringify(data))
  }
}

LogoutCommand.description = 'delete an existing profile'

LogoutCommand.args = [
  { name: 'name', description: 'profile name', required: true }
]

LogoutCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

LogoutCommand.examples = [
  '$ sshpm logout Server'
]

module.exports = LogoutCommand
