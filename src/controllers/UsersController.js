class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    console.log({
      name,
      email,
      password
    })

    return res.send()
  }
}

module.exports = UsersController