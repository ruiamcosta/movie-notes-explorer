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

  async index(req, res) {
    const { user_id, title, tags } = req.query

    let titleString = title
    titleString = titleString ?? ''

    let movie_notes

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag)

      movie_notes = await knex('movie_tags')
        .select([
          'movie_notes.id',
          'movie_notes.title',
          'movie_notes.user_id'
        ])
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${titleString}%`)
        .whereIn('name', filterTags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
        .orderBy('movie_notes.title')
    } else {
      movie_notes = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${titleString}%`)
        .orderBy('title')
    }

    const userTags = await knex('movie_tags').where({ user_id })
    const notesWithTags = movie_notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }
}

module.exports = MovieNotesController