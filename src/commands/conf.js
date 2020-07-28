const { Command } = require('@oclif/command')

class ConfCommand extends Command {
  async run () {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')
    const open = require('open')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    open(file)
  }
}

ConfCommand.description = 'open sps configuration'

module.exports = ConfCommand
