const router = require('express').Router()
let notes = require('./notes')

const ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

router

  .get('/', (req, res) => {
    res.status(200).json(notes)
  })

  .post('/', (req, res) => {
    const { title, note } = req.body
    const newNote = {
      id: ID(),
      title,
      note
    }
    notes.push(newNote)
    res.status(201).json({ id: newNote.id })
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params
    // const _id = parseInt(id)
    // if (isNaN(_id) || _id < 0 || _id > counter) {
    //   res.status(400).json({ response: 'id invalid' })
    //   return
    // }

    const note = notes.find((n) => {
      if (n.id === id) {
        return n
      }
    })
    const index = notes.indexOf(note)
    notes.splice(index, 1);
    res.status(200).json({ response: 'deleted' })
  })

  .put('/:id', (req, res) => {
    const { id } = req.params
    // const _id = Number(id)
    // if (isNaN(_id) || _id < 0 || _id > counter) {
    //   res.status(404).json({ response: 'id invalid' })
    //   return
    // }
    const { title, note } = req.body
    const updatedNote = {
      id,
      title: title.replace(/\n/, ' '),
      note: note.replace(/\n/, ' ')
    }
    const nt = notes.find(e => {
      if (e.id === id) {
        return e
      }
    })
    const index = notes.indexOf(nt)
    notes.splice(index, 1, updatedNote)
    res.status(200).json({ response: 'updated' })
  })

module.exports = router

