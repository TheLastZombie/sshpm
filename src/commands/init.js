const { Command } = require('@oclif/command')

class InitCommand extends Command {
  async run () {
    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (fs.existsSync(file)) throw Error('configuration file already exists')

    fs.writeFileSync(file, '[]')
  }
}

InitCommand.description = 'create an empty configuration file'

module.exports = InitCommand
