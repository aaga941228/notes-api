const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require('./config')

const app = express();

app.set("port", config.port);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/notes", require("./routes"));

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

module.exports = app;
