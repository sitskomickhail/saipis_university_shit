const mailSchema = require("./schemas/mailSchema")

const updateMail = (id, sender, reciever, message, messageType) => {
  mailSchema.Mail.updateOne({_id: id }, {sender: sender, reciever: reciever, message: message, messageType: messageType}, function(err){
    if(err) return console.log(err);
        
    console.log("Объект обновлен");
  });
}

module.exports.updateMail = updateMail;