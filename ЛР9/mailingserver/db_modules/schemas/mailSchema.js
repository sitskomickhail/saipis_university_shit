const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mailScheme = new Schema({
  sender: String,
  reciever: String,
  message: String,
  sendDate: String,
  sendTime: String,
  messageType: String
});

mongoose.connect("mongodb://localhost:27017/mailsdb", { useUnifiedTopology: true, useNewUrlParser: true });
let Mail = mongoose.model("Mail", mailScheme);  

module.exports.Mail = Mail;
module.exports.mongoose = mongoose;