const init = require('../src/commands/init')

test('tries to modify the configuration file', async () => {
  await expect(init.run()).resolves.toBe(undefined)
})
