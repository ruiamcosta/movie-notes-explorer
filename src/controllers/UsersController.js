const AppError = require("../utils/AppError")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    if(!name) {
      throw new AppError('You got to provide a name')
     }

    return res.send()
  }
}

module.exports = UsersController