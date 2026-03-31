const path = require('path')

async function main() {
  const root = path.resolve(__dirname, '..')

  const dataSourceMod = require(path.join(root, 'packages/server/dist/DataSource'))
  const serverMod = require(path.join(root, 'packages/server/dist/index'))

  const DataSource = dataSourceMod.default || dataSourceMod
  const Server = serverMod.default || serverMod

  if (typeof DataSource.init === 'function') {
    await DataSource.init()
  }

  if (typeof Server.start === 'function') {
    await Server.start()
    return
  }

  if (typeof Server === 'function') {
    await Server()
    return
  }

  throw new Error('Server.start bulunamadi')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})