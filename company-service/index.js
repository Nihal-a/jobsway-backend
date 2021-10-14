var express = require('express')
var routes = require('./routes/routes')

const PORT  = 4000;
const app = express()

app.use('/',routes)

app.listen(PORT,(err) => {
    if(err) console.log("Server failed to start. Error : " + err);
    else console.log(`Server started at port : ${PORT}.`);
})
