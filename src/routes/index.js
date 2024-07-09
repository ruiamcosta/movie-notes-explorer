const Router = require('express')
const userRoutes = require('./usersRoutes')
const movieNotesRoutes = require('./movieNotesRoutes')
const movieTagsRoutes = require('./movieTagsRoutes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/movie-notes', movieNotesRoutes)
routes.use('/movie-tags', movieTagsRoutes)

module.exports = routes