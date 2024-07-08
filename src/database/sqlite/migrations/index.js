const createUsers = require('./createUsers')
const sqliteConnection = require('..')

function migrationRuns() {
  const schemas = [
    createUsers
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationRuns