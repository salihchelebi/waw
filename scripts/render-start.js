const path = require('path')

async function main() {
  const root = path.resolve(__dirname, '..')
  const DataSource = require(path.join(root, 'packages/server/dist/DataSource'))
  const Server = require(path.join(root, 'packages/server/dist/index'))

  await DataSource.init()
  await Server.start()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})