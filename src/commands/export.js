const { Command, flags } = require('@oclif/command')

class ExportCommand extends Command {
  async run () {
    const { args, flags } = this.parse(ExportCommand)

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

    fs.copyFileSync(file, path.resolve(args.file))
  }
}

ExportCommand.description = 'export profiles to file'

ExportCommand.args = [
  { name: 'file', description: 'file to export profiles to', required: true }
]

ExportCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

ExportCommand.examples = [
  '$ sshpm export config.json'
]

module.exports = ExportCommand
