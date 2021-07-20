module.exports = (cli) => {
  const https = require('https')
  const JSZip = require('jszip')
  const path = require('path')
  const fs = require('fs')

  const platforms = {
    darwin: 'osx',
    freebsd: 'freebsd',
    linux: 'linux',
    openbsd: 'openbsd',
    sunos: 'solaris',
    win32: 'windows'
  }

  const architectures = {
    arm: 'arm',
    arm64: 'arm64',
    ia32: '386',
    mips: 'mips',
    mipsel: 'mipsle',
    x32: '386',
    x64: 'amd64'
  }

  const platform = platforms[process.platform]
  const architecture = architectures[process.arch]

  const url = 'https://downloads.rclone.org/rclone-current-' + platform + '-' + architecture + '.zip'

  https.get(url, res => {
    let data = []

    res.on('data', chunk => data.push(chunk))
    res.on('end', () => {
      data = Buffer.concat(data)

      JSZip.loadAsync(data).then(zip => {
        const file = Object.keys(zip.files).filter(x => x.endsWith('rclone') || x.endsWith('rclone.exe'))
        const name = path.resolve(cli.config.dataDir, zip.file(file).name.split('/')[1])

        zip.file(file).async('nodebuffer').then(res => {
          if (!fs.existsSync(cli.config.dataDir)) fs.mkdirSync(cli.config.dataDir, { recursive: true })

          fs.writeFileSync(name, res)
          fs.chmodSync(name, 0o755)
        })
      })
    })
  })
}
