const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const itemsRouter = require("./routes/items");
const categoriesRouter = require("./routes/categories");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "dev") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the db"))
  .catch((err) => {
    console.log("Erro while connecting to the db", err);
  });

app.listen(3000, () => console.log("app listening on port 3000!"));

module.exports = app;
