const mailSchema = require("./schemas/mailSchema")

const getMail = (id, response) => {
  mailSchema.Mail.find({_id : id}, function(err, docs){
    
    if(err) return console.log(err);
     
    const mail = {
        "id": docs[0]._id,
        "sender" : docs[0].sender,
        "reciever" : docs[0].reciever,
        "message" : docs[0].message,
        "sendDate" : `${docs[0].sendDate} ${docs[0].sendTime}`,
        "messageType" : docs[0].messageType
      };
    
    console.log(mail);
    response.send(mail);
  });
}

module.exports.getMailById = getMail;