const { hash } = require('bcryptjs')
const AppError = require("../utils/AppError")
const sqliteConnection = require('../database/sqlite')
const isValidEmail = require('../utils/isValidEmail')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const database = await sqliteConnection()

    if(!isValidEmail(email)) {
      throw new AppError('You must provide a valid email')
    }

    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(checkUserExists) {
      throw new AppError('This email is already in use.')
    }

    const hashedPassword = await hash(password, 8)

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword]
    )

    return res.status(201).json()
  }
}

module.exports = UsersController