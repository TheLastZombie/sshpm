const { Command, flags } = require('@oclif/command')

class LoginCommand extends Command {
  async run () {
    const { args, flags } = this.parse(LoginCommand)

    const path = require('path')
    const fs = require('fs')

    const dir = this.config.configDir
    const file = path.resolve(dir, 'config.json')

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]')

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (data.map(x => x.name).includes(args.name)) throw Error('a profile with the same name already exists')
    if (flags.key && !fs.existsSync(flags.key) && !flags.force) throw Error('key file does not exist, use -f to continue')

    data.push({
      name: args.name,
      host: flags.host,
      port: flags.port,
      user: flags.user,
      pass: flags.pass,
      key: flags.key,
      time: Math.floor(Date.now() / 1000)
    })

    fs.writeFileSync(file, JSON.stringify(data))
  }
}

LoginCommand.description = 'add a new profile'

LoginCommand.args = [
  { name: 'name', description: 'profile name', required: true }
]

LoginCommand.flags = {
  host: flags.string({ char: 'h', description: 'SSH host or IP', required: true }),
  port: flags.string({ char: 'o', description: 'custom SSH port', default: 22 }),
  user: flags.string({ char: 'u', description: 'SSH user name', required: true }),
  pass: flags.string({ char: 'p', description: 'SSH password', exclusive: ['key'] }),
  key: flags.string({ char: 'k', description: 'SSH key file', exclusive: ['pass'] }),
  force: flags.boolean({ char: 'f', description: 'ignore non-fatal errors' })
}

module.exports = LoginCommand
