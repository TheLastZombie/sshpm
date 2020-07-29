const { Command } = require('@oclif/command')

class OpenCommand extends Command {
  async run () {
    const path = require('path')
    const fs = require('fs')
    const open = require('open')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    open(file)
  }
}

OpenCommand.description = 'open sps configuration'

module.exports = OpenCommand
