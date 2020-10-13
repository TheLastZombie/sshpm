module.exports = async (cli, data, flags) => {
  const { Registry } = require('rage-edit')
  const childProcess = require('child_process')

  if (!flags.init && !await Registry.has('HKCU\\SOFTWARE\\Martin Prikryl\\WinSCP 2\\Sessions')) throw Error('WinSCP configuration key does not exist')

  if (!flags.keep) {
    const conf = await Registry.get('HKCU\\SOFTWARE\\Martin Prikryl\\WinSCP 2\\Sessions')
    if (conf) {
      for (const element of Object.keys(conf)) {
        const x = await Registry.get('HKCU\\SOFTWARE\\Martin Prikryl\\WinSCP 2\\Sessions\\' + element)
        if (!x || !x.$values.sshpm) continue
        await Registry.delete('HKCU\\SOFTWARE\\Martin Prikryl\\WinSCP 2\\Sessions\\' + element)
      }
    }
  }

  data.forEach(async element => {
    if (element.key && !flags.exec) return cli.log('Error: WinSCP.com not specified, please point to it using -x')

    if (element.key) childProcess.spawn(flags.exec, ['/keygen', element.key, '/output=' + element.key + '.ppk'])
    const key = 'HKCU\\SOFTWARE\\Martin Prikryl\\WinSCP 2\\Sessions\\' + encodeURIComponent(element.name)
    await Registry.set(key, 'HostName', element.host)
    await Registry.set(key, 'PortNumber', Number(element.port))
    await Registry.set(key, 'UserName', element.user)
    if (element.pass) await Registry.set(key, 'PasswordPlain', element.pass)
    if (element.key) await Registry.set(key, 'PublicKeyFile', element.key + '.ppk')
    await Registry.set(key, 'Sshpm', cli.config.version)
  })
}
