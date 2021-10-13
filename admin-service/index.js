import express from 'express'
import routes from './routes/routes.js'

const PORT  = 3000;
const app = express()

app.use('/',routes)

app.listen(PORT,(err) => {
    if(err) console.log("Server failed to start. Error : " + err);
    else console.log(`Server started at port : ${PORT}.`);
})