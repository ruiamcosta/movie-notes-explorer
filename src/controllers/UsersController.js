const AppError = require("../utils/AppError")
const sqliteConnection = require('../database/sqlite')


class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const database = await sqliteConnection()

    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(checkUserExists) {
      throw new AppError('This email is already in use.')
    }

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, password]
    )

    return res.status(201).json()
  }
}

module.exports = UsersController