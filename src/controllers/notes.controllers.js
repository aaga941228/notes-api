const sequelize = require("../database");
const noteModel = sequelize.models.note;

const ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

module.exports = {
  getNotes: async function(req, res) {
    const nts = await noteModel.findAll();
    res.status(200).json(nts);
  },
  getNote: async function(req, res) {
    const { id } = req.params;
    const nt = await noteModel.findOne({ id });
    if (!nt) {
      res.status(404).json({ response: "note not found" });
      return;
    }
    res.status(200).json(nt);
  },
  postNote: async function(req, res) {
    const { title, note, id } = req.body;
    if (id) {
      const nwNt = {
        id,
        title,
        note
      };
      await noteModel.create(nwNt);
      res.status(201).json({ id: nwNt.id });
      return;
    }
    const nwNt = {
      id: ID(),
      title,
      note
    };
    await noteModel.create(nwNt);
    res.status(201).json({ id: nwNt.id });
  },
  deleteNote: async function(req, res) {
    const { id } = req.params;
    const nt = await noteModel.findOne({ where: { id } });
    if (!nt) {
      res.status(404).json({ response: "note not found" });
    }
    await nt.destroy();
    res.status(200).json({ response: "deleted" });
  },
  putNote: async function(req, res) {
    const { id } = req.params;
    const { title, note } = req.body;
    const nt = await noteModel.findOne({ where: { id } });
    if (!nt) {
      res.status(404).json({ response: "note not found" });
      return;
    }
    const updtdNt = {
      id,
      title,
      note
    };
    await nt.update(updtdNt);
    res.status(200).json({ response: "updated" });
  }
};
