const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/mail", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const getMails = require("./db_modules/getMails");
  getMails.getMails(res);
});

app.get("/api/getMailById", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const getMailModule = require("./db_modules/getMailById");
  const mailId = req.query.id;

  getMailModule.getMailById(mailId, res);
});

app.get("/api/mail/filters", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const filterMails = require("./db_modules/filterMail");
  const messageForDate = req.query.messageForDate;
  
  console.log(messageForDate);

  filterMails.getMails(messageForDate, res);
});

app.post("/api/mail", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);

    const addMail = require("./db_modules/addMail");

    addMail.createMail(req.body.sender, req.body.reciever, req.body.message, req.body.messageType);
    addMail.insertMail();
    
    res.send("Успешно записано!");
});


app.post("/api/mail/delete", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);

  const deleteModule = require("./db_modules/deleteMail");

  deleteModule.delete(req.body.id);
  
  res.send("Успешно удалено!");
});

app.post("/api/mail/update", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);

  const updagteModule = require("./db_modules/updateMail");

  updagteModule.updateMail(req.body.id, req.body.sender, req.body.reciever, req.body.message, req.body.messageType);
  
  res.send("Успешно обновлено!");
});

app.listen(5000, function () {
    console.log("Сервер начал работу...");
});