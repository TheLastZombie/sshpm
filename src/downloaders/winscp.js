module.exports = (cli) => {
  const https = require('https')
  const JSZip = require('jszip')
  const path = require('path')
  const fs = require('fs')

  const url =
    'https://netcologne.dl.sourceforge.net/project/winscp/WinSCP/5.19.2/WinSCP-5.19.2-Portable.zip'

  https.get(url, (res) => {
    let data = []

    res.on('data', (chunk) => data.push(chunk))
    res.on('end', () => {
      data = Buffer.concat(data)

      JSZip.loadAsync(data).then((zip) => {
        if (!fs.existsSync(cli.config.dataDir)) {
          fs.mkdirSync(cli.config.dataDir, { recursive: true })
        }

        zip
          .file('WinSCP.com')
          .async('nodebuffer')
          .then((res) => {
            fs.writeFileSync(
              path.resolve(cli.config.dataDir, 'WinSCP.com'),
              res
            )
            fs.chmodSync(path.resolve(cli.config.dataDir, 'WinSCP.com'), 0o755)

            zip
              .file('WinSCP.exe')
              .async('nodebuffer')
              .then((res) => {
                fs.writeFileSync(
                  path.resolve(cli.config.dataDir, 'WinSCP.exe'),
                  res
                )
                fs.chmodSync(
                  path.resolve(cli.config.dataDir, 'WinSCP.exe'),
                  0o755
                )
              })
          })
      })
    })
  })
}
