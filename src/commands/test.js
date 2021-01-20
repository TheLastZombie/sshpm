const { Command, flags } = require('@oclif/command')

class TestCommand extends Command {
  async run () {
    const { args, flags } = this.parse(TestCommand)

    const path = require('path')
    const fs = require('fs')
    const Client = require('ssh2').Client
    const conn = new Client()

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

    let data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (!data.map(x => x.name).includes(args.name)) throw Error('specified profile not found')
    data = data.filter(x => x.name === args.name)[0]

    conn.on('ready', () => {
      this.log('Success: Connection succeeded.')
      conn.end()
    }).on('error', (err) => {
      this.log(err.toString() + '.')
    }).connect({
      host: data.host,
      port: data.port,
      username: data.user,
      password: data.pass,
      privateKey: (data.key ? fs.readFileSync(data.key, 'utf-8') : undefined)
    })
  }
}

TestCommand.description = 'try to connect to a profile'

TestCommand.args = [
  { name: 'name', description: 'profile name', required: true }
]

TestCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' })
}

TestCommand.examples = [
  '$ sshpm test Server'
]

module.exports = TestCommand
