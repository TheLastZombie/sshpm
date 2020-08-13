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

    const programs = args.program.split(',')

    programs.forEach(program => {
      const file = path.resolve(__dirname, '..', 'exporters', program + '.js')
      if (!fs.existsSync(file)) throw Error('program ' + program + ' is not supported')

      let conf
      if (flags.conf) conf = flags.conf.filter(x => x.startsWith(program + ':'))[0]
      if (conf) conf = conf.slice(program.length + 1)

      this.log('Sending profile to ' + program + '...')
      require(file)(this, data, {
        ...flags,
        conf: conf
      })
    })
  }
}

ApplyCommand.description = 'send profiles to programs'

ApplyCommand.args = [
  { name: 'program', description: 'program to send profiles to', required: true }
]

ApplyCommand.flags = {
  keep: flags.boolean({ char: 'k', description: 'keep previous profiles sent by sshpm' }),
  conf: flags.string({ char: 'c', description: 'application configuration files', multiple: true })
}

ApplyCommand.examples = [
  '$ sshpm apply openssh',
  '$ sshpm apply putty',
  '$ sshpm apply winscp',
  '$ sshpm apply winscp-portable -c winscp-portable:winscp.ini',
  '$ sshpm apply zoc',
  '$ sshpm apply x,y,z'
]

module.exports = ApplyCommand
