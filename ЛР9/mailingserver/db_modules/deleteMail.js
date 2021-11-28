const mailSchema = require("./schemas/mailSchema")

const deleteMailFunction = (id) => {
    mailSchema.Mail.deleteOne({_id: id}, function(err){
      if(err) return console.log(err);
          
      console.log("Объект удален");
    });
}

module.exports.delete = deleteMailFunction;