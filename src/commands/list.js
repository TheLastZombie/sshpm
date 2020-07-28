const { Command } = require('@oclif/command')
const { cli } = require('cli-ux')

class ResetCommand extends Command {
  async run () {
    const os = require('os')
    const path = require('path')
    const fs = require('fs')

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'logins.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    const data = JSON.parse(fs.readFileSync(file))
    if (!data.length) return
    const rows = {}
    // eslint-disable-next-line no-return-assign
    Object.keys(data[0]).forEach(x => rows[x] = {})

    cli.table(data, rows, {
      sort: 'name'
    })
  }
}

ResetCommand.description = 'list profiles'

module.exports = ResetCommand
