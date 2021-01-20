const { Command, flags } = require('@oclif/command')

class LoginCommand extends Command {
  async run () {
    const { args, flags } = this.parse(LoginCommand)

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

    const name = args.name || flags.user + '@' + flags.host

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]')

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (data.map(x => x.name).includes(name)) throw Error('a profile with the same name already exists')
    if (flags.key && !fs.existsSync(flags.key) && !flags.force) throw Error('key file does not exist, use -f to continue')

    data.push({
      name: name,
      host: flags.host,
      port: flags.port,
      user: flags.user,
      pass: flags.pass,
      key: (flags.key ? path.resolve(flags.key) : undefined),
      time: Math.floor(Date.now() / 1000)
    })

    fs.writeFileSync(file, JSON.stringify(data.sort((x, y) => x.name.localeCompare(y.name))))
  }
}

LoginCommand.description = 'add a new profile'

LoginCommand.args = [
  { name: 'name', description: 'profile name' }
]

LoginCommand.flags = {
  use: flags.string({ description: 'path to custom sshpm configuration file' }),
  host: flags.string({ char: 'h', description: 'SSH host or IP', required: true }),
  port: flags.string({ char: 'o', description: 'custom SSH port', default: 22 }),
  user: flags.string({ char: 'u', description: 'SSH user name', required: true }),
  pass: flags.string({ char: 'p', description: 'SSH password', exclusive: ['key'] }),
  key: flags.string({ char: 'k', description: 'SSH key file', exclusive: ['pass'] }),
  force: flags.boolean({ char: 'f', description: 'ignore non-fatal errors' })
}

LoginCommand.examples = [
  '$ sshpm login -h example.com -u username',
  '$ sshpm login Server -h example.com -o 22 -u username -p password',
  '$ sshpm login Server -h example.com -o 22 -u username -k id_rsa'
]

module.exports = LoginCommand
