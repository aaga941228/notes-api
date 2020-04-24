const sequelize = require("../database/sequelize");
const { note } = sequelize.models;

const queries = {
  findAll: async function () {
    try {
      const elements = await note.findAll();
      return elements || [];
    } catch (err) {
      console.error(err)
    }
  },

  findOne: async function (id) {
    try {
      const element = await note.findOne({ where: { id } });
      return element;
    } catch (err) {
      console.error(err)
    }
  },

  createOne: async function (newItem) {
    try {
      const element = await note.create(newItem);
      return element;
    } catch (err) {
      console.error(err)
    }
  },

  updateOne: async function (item, newItem) {
    try {
      const element = await item.update(newItem);
      return element;
    } catch (err) {
      console.error(err)
    }
  },

  deleteOne: async function (item) {
    try {
      const element = await item.destroy();
      return element;
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = queries;
