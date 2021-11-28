const mailSchema = require("./schemas/mailSchema")

const getListOfMail = (messageForDate, response) => {
  mailSchema.Mail.find({sendDate : messageForDate, messageType : "Заказное"}, function(err, docs){
    
    if(err) return console.log(err);
     
    const mails = docs.map(doc => {
      console.log(doc);

      return {
        "sender" : doc.sender,
        "reciever" : doc.reciever,
      };
    });
    
    console.log(mails);
    response.send(mails);
  });
}

module.exports.getMails = getListOfMail;