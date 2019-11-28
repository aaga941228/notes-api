const sequelize = require("../database/sequelize");
const noteModel = sequelize.models.note;

const DataBaseQueries = async function(querie, id, item, newItem) {
  switch (querie) {
    case "findAll":
      const elements = await noteModel.findAll();
      return elements;
    case "findOne":
      const element = await noteModel.findOne({ where: { id } });
      return element;
    case "createOne":
      await noteModel.create(newItem);
      return;
    case "updateOne":
      await item.update(newItem);
      return;
    case "deleteOne":
      await item.destroy();
    default:
      break;
  }
};

module.exports = DataBaseQueries;
