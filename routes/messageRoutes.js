const express = require("express");
const messageModel = require("../models/messageSchema");
const app = express();
const jwtCheck = require("../middleware/jwtCheck");

//CREATE
app.post("/send/:username", jwtCheck, async (req, res) => {
  var data = {
    to: req.params.username,
    from: req.token.data.username,
    context: req.body.context,
  };
  const message = new messageModel(data);

  //console.log(data)

  try {
    await message.save();
    res.send(message);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
