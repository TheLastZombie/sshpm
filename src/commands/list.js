const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ListCommand extends Command {
  async run () {
    const { flags } = this.parse(ListCommand)

    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file))
    if (!data.length) return

    if (flags.json) {
      this.log(data)
    } else {
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
}

ListCommand.description = 'list profiles'

ListCommand.flags = {
  json: flags.boolean({ char: 'j', description: 'output in JSON format' })
}

module.exports = ListCommand
