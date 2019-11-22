const router = require("express").Router();
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

router

  .get("/", async (req, res) => {
    const nts = await noteModel.findAll();
    res.status(200).json(nts);
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const nt = await noteModel.findOne({ id });
    res.status(200).json(nt);
  })

  .post("/", async (req, res) => {
    const { title, note } = req.body;
    const nwNt = {
      id: ID(),
      title,
      note
    };
    await noteModel.create(nwNt);
    res.status(201).json({ id: nwNt.id });
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const nt = await noteModel.findOne({ where: { id } });
    if (!nt) {
      res.status(404).json({ response: "user not found" });
    }
    await nt.destroy();
    res.status(200).json({ response: "deleted" });
  })

  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, note } = req.body;
    const nt = await noteModel.findOne({ where: { id } });
    if (!nt) {
      res.status(404).json({ response: "note not found" });
      return;
    }
    const updtdNt = {
      id,
      title: title.replace(/\n/, " "),
      note: note.replace(/\n/, " ")
    };
    await nt.update(updtdNt);
    res.status(200).json({ response: "updated" });
  });

module.exports = router;
