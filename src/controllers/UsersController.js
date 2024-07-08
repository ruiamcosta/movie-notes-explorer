const { hash, compare } = require('bcryptjs')
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

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const database = await sqliteConnection()

    if(!isValidEmail(email)) {
      throw new AppError('You must provide a valid email')
    }

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if(!user) {
      throw new AppError('User does not exists.')
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already in use.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError('You need to provide the old password.')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('Old password not correct.')
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )

    return res.json()
  }
}

module.exports = UsersController