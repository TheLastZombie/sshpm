const { Command, flags } = require('@oclif/command')

class InitCommand extends Command {
  async run () {
    const { flags } = this.parse(InitCommand)

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

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(file, '[]')
  }
}

InitCommand.aliases = ['touch', 'reset', 'rm']

InitCommand.description = 'create or reset the profile file'

InitCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

InitCommand.examples = [
  '$ sshpm init'
]

module.exports = InitCommand
