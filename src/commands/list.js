const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ListCommand extends Command {
  async run () {
    const { flags } = this.parse(ListCommand)

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

    if (!fs.existsSync(dir)) {
      throw Error('configuration directory does not exist')
    }
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (!data.length) return

    if (flags.json) {
      this.log(data)
    } else {
      cli.table(
        data,
        {
          name: { header: 'Profile name' },
          host: { header: 'Host or IP' },
          port: { header: 'Port' },
          user: { header: 'User name' },
          pass: { header: 'Password', get: (x) => x.pass || '' },
          key: { header: 'Key file', get: (x) => x.key || '' },
          time: { header: 'Timestamp' }
        },
        {
          sort: 'name'
        }
      )
    }
  }
}

ListCommand.aliases = ['ls']

ListCommand.description = 'list profiles'

ListCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' }),
  json: flags.boolean({ char: 'j', description: 'output in JSON format' })
}

ListCommand.examples = ['$ sshpm list', '$ sshpm list -j']

module.exports = ListCommand
