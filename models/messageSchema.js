const mongoose = require("mongoose");

// message schema
const messageSchema = new mongoose.Schema({
  to: String,
  from: String, 
  context: String,
  arrivedAt: { type: Date },
  readedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

//messageSchema.statics.findActiveUser = function (callback) {
//  this.find(callback);
//}
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
