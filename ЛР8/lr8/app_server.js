const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

const filePath = "file.json";
app.get("/api/data", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    res.send(users);
});

app.post("/api/data", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    fs.writeFile(filePath, JSON.stringify(req.body), "utf-8", (err, file) => {
        if(err) throw err;
    })

    res.send("Recieved");
});

app.listen(5000, function () {
    console.log("Сервер начал работу...");
});