const queries = require("../database/database");

const ID = () =>
  `_${Math.random().toString(36).substr(2, 9)}`

getNotes = async function (req, res) {
  try {
    const data = await queries.findAll();
    res.status(200).json({ message: 'ok', data });
  } catch (err) {
    console.error(err)
  }
}

getNote = async function (req, res) {
  const { id } = req.params;
  try {
    const data = await queries.findOne(id);
    if (!data) {
      res.status(404).json({ message: "note not found", data: {} });
      return false;
    }
    res.status(200).json({ message: 'ok', data });
  } catch (err) {
    console.error(err)
  }
}

postNote = async function (req, res) {
  const { title, note, id } = req.body;
  try {
    if (id) {
      const exists = await queries.findOne(id);
      if (!!exists) {
        res.status(400).json({ message: 'the id has already taken', data: {} });
        return false;
      }
      const newNote = {
        id,
        title,
        note
      };
      const data = await queries.createOne(newNote);
      res.status(201).json({ message: 'note created', data });
      return false;
    }
    const newNote = {
      id: ID(),
      title,
      note
    };
    const data = await queries.createOne(newNote);
    res.status(201).json({ message: 'note created', data });
  } catch (err) {
    console.error(err)
  }
}

deleteNote = async function (req, res) {
  const { id } = req.params;
  try {
    const data = await queries.findOne(id);
    if (!data) {
      res.status(404).json({ message: "note not found" });
      return false;
    }
    const newData = await queries.deleteOne(data);
    res.status(200).json({ message: "note deleted", data: newData });
  } catch (err) {
    console.error(err)
  }
}

putNote = async function (req, res) {
  const { id } = req.params;
  const { title, note } = req.body;
  try {
    const data = await queries.findOne(id);
    if (!data) {
      res.status(404).json({ message: "note not found", data: {} });
      return false;
    }
    const updatedNote = {
      id,
      title,
      note
    };
    const newData = await queries.updateOne(data, updatedNote);
    res.status(200).json({ message: "updated note", data: newData });
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getNotes,
  getNote,
  postNote,
  deleteNote,
  putNote
};
