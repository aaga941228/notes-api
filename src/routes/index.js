const router = require("express").Router();
const { getNotes, getNote, postNote, deleteNote, putDelete } = require("../controllers");

router
  .get("/", getNotes)
  .get("/:id", getNote)
  .post("/", postNote)
  .delete("/:id", deleteNote)
  .put("/:id", putNote);

module.exports = router;
