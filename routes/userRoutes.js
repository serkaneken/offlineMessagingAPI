const express = require("express");
const userModel = require("../models/userSchema");
const app = express();
const jwt = require("jsonwebtoken");
const hashPassword = require("../helpers/hashPassword");
const jwtCheck = require("../middleware/jwtCheck");
//READ

app.get("/", async (req, res) => {
  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//CREATE
app.post("/", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
/*app.delete("/user/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});*/

//LOGIN
app.post("/login/", async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  const users = await userModel.find(req.body);
  if (users != "") {
    res.json({
      token: jwt.sign({ data: users[0] }, "ugurcanArmutSerkanDivlop", {
        expiresIn: 60 * 60,
      }),
    });
    //res.json(users[0]);
  } else {
    res.json({
      message: "Incorrect Username or Password",
    });
  }
});

//TOKEN TEST
app.get("/tokentest", jwtCheck, async (req, res) => {
  //console.log(req.headers.authorization);
  res.send(req.token);
});

//UPDATE
app.patch("/:id", async (req, res) => {
  try {
    await (await userModel.findByIdAndUpdate(req.params.id, req.body)).save();
    //await userModel.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
