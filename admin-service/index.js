var express = require('express')
var routes = require('./routes/routes')
var db = require('./config/connection')
const cors = require('cors');


const PORT  = 4001;
const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())


app.use('/api/v1/admin/',routes)

db.connect((err)=>{
    if(err) console.log("Database Connection Error"+err);
    else console.log("database Connected Successfully");
})

app.listen(PORT,(err) => {
    if(err) console.log("Server failed to start. Error : " + err);
    else console.log(`ADMIN SERVICE - Server started at port : ${PORT}.`);
})