const { Command } = require('@oclif/command')

class ResetCommand extends Command {
  async run () {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'logins.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    fs.writeFileSync(file, '[]')
  }
}

ResetCommand.description = 'delete all profiles'

module.exports = ResetCommand
