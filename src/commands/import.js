const { Command, flags } = require('@oclif/command')

class ImportCommand extends Command {
  async run () {
    const { args, flags } = this.parse(ImportCommand)

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

    const output = JSON.parse(fs.readFileSync(file, 'utf-8'))
    const input = JSON.parse(fs.readFileSync(path.resolve(args.file)))

    if (flags.init || !output.length) return fs.copyFileSync(path.resolve(args.file), file)

    input.forEach(element => {
      if (output.map(x => x.name).includes(element.name)) {
        console.log('A connection with the name ' + element.name + ' already existed and has been overwritten.')
        output.splice(output.map(x => x.name).indexOf(element.name), 1)
      }
    })
    fs.writeFileSync(file, JSON.stringify(output.concat(input)))
  }
}

ImportCommand.description = 'import profiles from file'

ImportCommand.args = [
  { name: 'file', description: 'file to import profiles from', required: true }
]

ImportCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' }),
  init: flags.boolean({ char: 'i', description: 'remove existing profiles before importing' })
}

ImportCommand.examples = [
  '$ sshpm import config.json'
]

module.exports = ImportCommand
