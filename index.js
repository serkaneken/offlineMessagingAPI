const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();
app.use(express.json()); // Make sure it comes back as json
app.use(bodyParser.urlencoded({ extended: true }));

//app.get("/", (res) => res.send("Hello World!"));

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use('/user', userRoutes);
app.use('/messages', messageRoutes);


const port = 3000;
app.listen(port, () => {
  console.log("Server is running at " + port);
});
