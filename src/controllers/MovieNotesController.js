const knex = require('../database/knex')

class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    return res.status(201).json()
  }
}

module.exports = MovieNotesController