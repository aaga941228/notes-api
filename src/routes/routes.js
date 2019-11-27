const router = require("express").Router();
const controllers = require("../controllers/notesControllers");

router
  .get("/", controllers.getNotes)
  .get("/:id", controllers.getNote)
  .post("/", controllers.postNote)
  .delete("/:id", controllers.deleteNote)
  .put("/:id", controllers.putNote);

module.exports = router;
