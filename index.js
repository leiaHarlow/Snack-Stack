require("dotenv").config();
const express = require("express");
const path = require("path");
// const db = require("./db.js");
const {SnackModel, save, change} = require("./db.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/snacks', (req, res) => {

  SnackModel.find()
  .sort({counter: -1})
  .exec((err, results) => {
    if (err) {
      res.status(500).send('err')
    } else {
      res.json(results);
    }
  })
});

app.post('/snacks', (req, res) => {

  save(req.body, (err, data) => {
    if (err) {
      res.status(500).send('Error with post');
    } else {
      res.send(201);
    }
  })

});

app.put('/snacks', (req, res) => {

  change(req.body, (err, data) => {
    console.log(req.body);
    if (err) {
      res.status(500).send('Error with post');
    } else {
      res.send(201);
    }
  })

});

app.listen(3001, () => {
  console.log('listening on Port')
})