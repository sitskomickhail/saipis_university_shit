const mailSchema = require("./schemas/mailSchema")
let mailObject = undefined;

const createMail = (sender, reciever, message, messageType) => {
  const sendDateTime = new Date(); 
  
  mailObject = new mailSchema.Mail({
    sender: sender,
    reciever: reciever,
    message: message,
    sendDate: `${sendDateTime.getDate()}.${sendDateTime.getMonth() + 1}.${sendDateTime.getFullYear()}`,
    sendTime: `${sendDateTime.getHours()}:${sendDateTime.getMinutes()}:${sendDateTime.getSeconds()}`,
    messageType: messageType
  });
}

const insertMailFunction = () => {
    if(mailObject !== undefined) {
      
      console.log("Test time", new Date());
      console.log("До сохранения", mailObject);

      mailObject.save(function(err){
      
      if(err) return console.log(err);
          
      console.log("Сохранен объект", mailObject);
    });
  }
}

module.exports.createMail = createMail;
module.exports.insertMail = insertMailFunction;