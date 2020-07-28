const { Command } = require('@oclif/command')
const { cli } = require('cli-ux')

class ListCommand extends Command {
  async run () {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file))
    if (!data.length) return

    cli.table(data, {
      name: {},
      host: {},
      port: {},
      user: {},
      pass: {},
      key: {},
      time: {}
    }, {
      sort: 'name'
    })
  }
}

ListCommand.description = 'list profiles'

module.exports = ListCommand
