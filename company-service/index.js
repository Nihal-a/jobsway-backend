var express = require('express')
var routes = require('./routes/routes')
var db = require('./config/connection')

const PORT  = 4000;
const app = express()

app.use('/',routes)

db.connect((err)=>{
    if(err) console.log("Database Connection Error"+err);
    else console.log("database Connected Successfully");
})


app.listen(PORT,(err) => {
    if(err) console.log("Server failed to start. Error : " + err);
    else console.log(`Server started at port : ${PORT}.`);
})
