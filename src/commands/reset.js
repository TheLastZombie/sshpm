const { Command } = require('@oclif/command')

class ResetCommand extends Command {
  async run () {
    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    fs.writeFileSync(file, '[]')
  }
}

ResetCommand.aliases = ['rm']

ResetCommand.description = 'delete all profiles'

ResetCommand.examples = [
  '$ sshpm reset'
]

module.exports = ResetCommand
