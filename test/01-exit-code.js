const sshpm = require('..')

test('checks help command for exit code', async () => {
  await expect(sshpm.run()).rejects.toThrow('EEXIT: 0')
})
