const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ListCommand extends Command {
  async run () {
    const { args, flags } = this.parse(ListCommand)

    const path = require('path')
    const fs = require('fs')
    const util = require('util')

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

    switch (args.format) {
      case 'csv':
        this.log(
          [
            'Profile name',
            'Host or IP',
            'Port',
            'User name',
            'Password',
            'Key file',
            'Timestamp'
          ].join(',')
        )
        this.log(
          data
            .map(
              (x) =>
                x.name +
                ',' +
                x.host +
                ',' +
                x.port +
                ',' +
                x.user +
                ',' +
                (x.pass || '') +
                ',' +
                (x.key || '') +
                ',' +
                x.time
            )
            .join('\n')
        )
        break
      case 'json':
        this.log(
          util.inspect(data, {
            colors: true
          })
        )
        break
      case 'json-minified':
        this.log(JSON.stringify(data))
        break
      case 'table':
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
        break
      case 'tsv':
        this.log(
          [
            'Profile name',
            'Host or IP',
            'Port',
            'User name',
            'Password',
            'Key file',
            'Timestamp'
          ].join('\t')
        )
        this.log(
          data
            .map(
              (x) =>
                x.name +
                '\t' +
                x.host +
                '\t' +
                x.port +
                '\t' +
                x.user +
                '\t' +
                (x.pass || '') +
                '\t' +
                (x.key || '') +
                '\t' +
                x.time
            )
            .join('\n')
        )
        break
    }
  }
}

const formats = ['csv', 'json', 'json-minified', 'table', 'tsv']

ListCommand.aliases = ['ls']

ListCommand.description = 'list profiles'

ListCommand.args = [
  {
    name: 'format',
    description: 'format to output profiles in',
    default: 'table',
    options: formats
  }
]
ListCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

ListCommand.examples = [
  '$ sshpm list',
  ...formats.map((x) => '$ sshpm list ' + x)
]

module.exports = ListCommand
