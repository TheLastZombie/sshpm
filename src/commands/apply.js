const { Command, flags } = require('@oclif/command')

class ApplyCommand extends Command {
  async run () {
    const { args, flags } = this.parse(ApplyCommand)

    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))

    require(path.resolve(__dirname, '..', 'exporters', args.program + '.js'))(this, data, flags)
  }
}

const fs = require('fs')
const path = require('path')
const exporters = fs.readdirSync(path.resolve(__dirname, '..', 'exporters')).map(x => path.parse(x).name)

ApplyCommand.description = 'send profiles to programs'

ApplyCommand.args = [
  { name: 'program', description: 'program to send profiles to', required: true, options: exporters }
]

ApplyCommand.flags = {
  init: flags.boolean({ char: 'i', description: 'create non-existent configuration files' }),
  keep: flags.boolean({ char: 'k', description: 'keep previous profiles sent by sshpm' }),
  conf: flags.string({ char: 'c', description: 'application configuration file' }),
  exec: flags.string({ char: 'x', description: 'path to executable required by exporter' })
}

ApplyCommand.examples = [
  '$ sshpm apply filezilla',
  '$ sshpm apply kitty',
  '$ sshpm apply mremoteng',
  '$ sshpm apply openssh',
  '$ sshpm apply putty',
  '$ sshpm apply rclone',
  '$ sshpm apply winscp',
  '$ sshpm apply winscp-portable -c winscp.ini',
  '$ sshpm apply zoc'
]

module.exports = ApplyCommand
