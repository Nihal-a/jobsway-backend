var express = require('express')
var routes = require('./routes/routes')
var db = require('./config/connection')
const cors = require('cors');


const PORT  = 5000;
const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())


app.use('/',routes)

db.connect((err)=>{
    if(err) console.log("Database Connection Error"+err);
    else console.log("database Connected Successfully");
})

app.listen(PORT,(err) => {
    if(err) console.log("Server failed to start. Error : " + err);
    else console.log(`Server started at port : ${PORT}.`);
})