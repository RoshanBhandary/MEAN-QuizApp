const express = require("express");
const Quizzes = require("./models/question");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require("chalk");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
express()
  .use(express.static(path.join(__dirname, "public")))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/api", (req, res) => {
    res.json({ message: "You hit the end point!" });
  })
  .get("/quizzes", (req, res) => {
    Quizzes.find({}).exec((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          errormessage: "Unable to keep in the DB",
        });
      }
      res.json(data);
    });
  })
  .get("/quiz/id", (req, res) => {
    res.json({
      message: "Endpoint to get a summary of a single quiz with submissions",
    });
  })
  .post("/new", (req, res) => {
    const { description } = req.body;
    const { options } = req.body;
    const { title } = req.body;
    let quiz = new Quizzes({ description, options, title });
    quiz.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "couldn't save in the database",
        });
      }
      res.json(data);
    });
  })
  .post("/quiz/id", (req, res) => {
    res.json({ message: "Endpoint to submit a single quiz result" });
  })
  .listen(port, () => {
    console.log(
      "Server listening on " + chalk.blueBright(`http://localhost:${port}`)
    );
  });
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB  is paired!");
  } catch (err) {
    console.log("Something is wrong in the DB connection.");
  }
};
// Run DB
db();
