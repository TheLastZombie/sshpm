module.exports = async (cli, data, flags) => {
  const path = require('path')
  const { Registry } = require('rage-edit')
  const childProcess = require('child_process')

  const pathWinSCP = path.resolve(cli.config.dataDir, 'WinSCP.com')

  if (process.platform !== 'win32') throw Error('KiTTY uses registry entries, which are not supported on non-Windows systems')

  if (!flags.init && !await Registry.has('HKCU\\SOFTWARE\\9bis.com\\KiTTY\\Sessions')) throw Error('KiTTY configuration key does not exist')

  if (!flags.keep) {
    const conf = await Registry.get('HKCU\\SOFTWARE\\9bis.com\\KiTTY\\Sessions')
    if (conf) {
      for (const element of Object.keys(conf)) {
        const x = await Registry.get('HKCU\\SOFTWARE\\9bis.com\\KiTTY\\Sessions\\' + element)
        if (!x || !x.$values.sshpm) continue
        await Registry.delete('HKCU\\SOFTWARE\\9bis.com\\KiTTY\\Sessions\\' + element)
      }
    }
  }

  data.forEach(async element => {
    if (element.key) childProcess.spawn(flags.exec || pathWinSCP, ['/keygen', element.key, '/output=' + element.key + '.ppk'])
    const key = 'HKCU\\SOFTWARE\\9bis.com\\KiTTY\\Sessions\\' + element.name.replace(/\s/g, '%20')
    await Registry.set(key, 'HostName', element.host)
    await Registry.set(key, 'PortNumber', Number(element.port))
    await Registry.set(key, 'UserName', element.user)
    if (element.key) await Registry.set(key, 'PublicKeyFile', element.key + '.ppk')
    await Registry.set(key, 'Sshpm', cli.config.version)
  })
}
