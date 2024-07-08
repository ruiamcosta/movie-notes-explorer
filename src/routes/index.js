const Router = require('express')
const userRoutes = require('./usersRoutes')

const routes = Router()

routes.use('/users', userRoutes)

module.exports = routes