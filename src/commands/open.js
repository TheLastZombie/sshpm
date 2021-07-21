const { Command, flags } = require('@oclif/command')

class OpenCommand extends Command {
  async run () {
    const { flags } = this.parse(OpenCommand)

    const path = require('path')
    const fs = require('fs')
    const open = require('open')

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

    open(file)
  }
}

OpenCommand.description = 'open sshpm configuration'

OpenCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

OpenCommand.examples = [
  '$ sshpm open'
]

module.exports = OpenCommand
