const knex = require('../database/knex')

class MovieTagsController {
  async index(req, res) {
    const { user_id } = req.params

    const movie_tags = await knex('movie_tags').where({ user_id })

    return res.json(movie_tags)
  }
}

module.exports = MovieTagsController