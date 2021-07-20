const { Command } = require('@oclif/command')

class DownloadCommand extends Command {
  async run () {
    const { args } = this.parse(DownloadCommand)

    const path = require('path')

    require(path.resolve(__dirname, '..', 'downloaders', args.program + '.js'))(this)
  }
}

const fs = require('fs')
const path = require('path')
const downloaders = fs.readdirSync(path.resolve(__dirname, '..', 'downloaders')).map(x => path.parse(x).name)

DownloadCommand.aliases = ['dl']

DownloadCommand.description = 'download optional dependencies'

DownloadCommand.args = [
  { name: 'program', description: 'dependency to download', required: true, options: downloaders }
]

DownloadCommand.examples = fs.readdirSync(path.resolve(__dirname, '..', 'downloaders')).map(x => '$ sshpm download ' + path.parse(x).name)

module.exports = DownloadCommand
