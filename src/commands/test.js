const { Command } = require('@oclif/command')

class TestCommand extends Command {
  async run () {
    const { args } = this.parse(TestCommand)

    const os = require('os')
    const path = require('path')
    const fs = require('fs')
    const Client = require('ssh2').Client
    const conn = new Client()

    const dir = path.resolve(os.homedir(), '.config', 'sps')
    const file = path.resolve(dir, 'logins.json')

    if (!fs.existsSync(dir)) throw Error('configuration directory does not exist')
    if (!fs.existsSync(file)) throw Error('configuration file does not exist')

    let data = JSON.parse(fs.readFileSync(file))
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
      privateKey: (data.key ? fs.readFileSync(data.key) : undefined)
    })
  }
}

TestCommand.description = 'try to connect to a profile'

TestCommand.args = [
  { name: 'name', description: 'profile name', required: true }
]

module.exports = TestCommand
