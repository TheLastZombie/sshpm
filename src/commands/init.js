const { Command } = require('@oclif/command')

class InitCommand extends Command {
  async run () {
    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(file, '[]')
  }
}

InitCommand.aliases = ['touch', 'reset', 'rm']

InitCommand.description = 'create or reset the profile file'

InitCommand.examples = [
  '$ sshpm init'
]

module.exports = InitCommand
