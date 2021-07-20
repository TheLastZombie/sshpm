module.exports = (cli) => {
  const https = require('https')
  const JSZip = require('jszip')
  const path = require('path')
  const fs = require('fs')

  const url = 'https://winscp.net/download/files/202107200842a476468fa30f419b2d43b80f125d4051/WinSCP-5.19.1-Portable.zip'

  https.get(url, res => {
    let data = []

    res.on('data', chunk => data.push(chunk))
    res.on('end', () => {
      data = Buffer.concat(data)

      JSZip.loadAsync(data).then(zip => {
        if (!fs.existsSync(cli.config.dataDir)) fs.mkdirSync(cli.config.dataDir, { recursive: true })

        zip.file('WinSCP.com').async('nodebuffer').then(res => {
          fs.writeFileSync(path.resolve(cli.config.dataDir, 'WinSCP.com'), res)
          fs.chmodSync(path.resolve(cli.config.dataDir, 'WinSCP.com'), 0o755)

          zip.file('WinSCP.exe').async('nodebuffer').then(res => {
            fs.writeFileSync(path.resolve(cli.config.dataDir, 'WinSCP.exe'), res)
            fs.chmodSync(path.resolve(cli.config.dataDir, 'WinSCP.exe'), 0o755)
          })
        })
      })
    })
  })
}
