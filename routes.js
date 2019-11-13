const router = require('express').Router()
let notes = require('./notes')

router

  .get('/', (req, res) => {
    res.json(notes)
  })

  .post('/', (req, res) => {
    const { title, note } = req.body
    const newNote = {
      id: notes.length + 1,
      title,
      note
    }
    notes.push(newNote)
    res.json({ id: newNote.id })
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params
    const _id = parseInt(id)
    if (isNaN(_id) || _id <= 0 || _id > notes.length) {
      res.send('id invalid')
      return
    }
    const note = notes.find(n => {
      if (n.id === id) {
        return n
      }
    })
    const index = notes.indexOf(note)
    notes.splice(index, 1)
    res.json('deleted')
  })

  .put('/:id', (req, res) => {
    const { id } = req.params
    const _id = Number(id)
    if (isNaN(_id) || _id <= 0 || _id > notes.length) {
      res.send('id invalid')
      return
    }
    const { title, note } = req.body
    const updatedNote = {
      id,
      title: title.replace(/\n/, ''),
      note: note.replace(/\n/, '')
    }
    const element = notes.find(e => {
      if (e.id === id) {
        return e
      }
    })
    const index = notes.indexOf(element)
    notes.splice(index, 1, updatedNote)
    res.send('updated')
  })

module.exports = router

