const mailSchema = require("./schemas/mailSchema")

const getListOfMail = (response) => {
  mailSchema.Mail.find({}, function(err, docs){
    
    if(err) return console.log(err);
     
    const mails = docs.map(doc => {
      console.log(doc);
     
      return {
        "id": doc._id,
        "sender" : doc.sender,
        "reciever" : doc.reciever,
        "message" : doc.message,
        "sendDate" : `${doc.sendDate} ${doc.sendTime}`,
        "messageType" : doc.messageType
      };
    });
    
    console.log(mails);
    response.render("mailsList", {mails});
  });
}

module.exports.getMails = getListOfMail;