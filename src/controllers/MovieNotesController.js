const knex = require('../database/knex')

class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    const [note_id] = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    return res.status(201).json()
  }

  async show(req, res) {
    const { id } = req.params

    const notes = await knex('movie_notes').where({ id }).first()
    const tags = await knex('movie_tags').where({ note_id: id }).orderBy('name') 

    return res.json({
      ...notes,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('movie_notes').where({ id }).delete()

    return res.json()
  }
}

module.exports = MovieNotesController