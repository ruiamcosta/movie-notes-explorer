const Router = require('express')
const userRoutes = require('./usersRoutes')
const movieNotesRoutes = require('./movieNotesRoutes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/movie-notes', movieNotesRoutes)

module.exports = routes