const { Sequelize, Model } = require("sequelize");
const sequelize = new Sequelize("notes", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

class Note extends Model {}
Note.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    note: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: "note"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
