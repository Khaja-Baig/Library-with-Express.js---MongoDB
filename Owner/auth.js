const jwt = require("jsonwebtoken")

const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config({path: './config.env'})
const Owner = require('./Models/ownerModel')

const app = require("../app")

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
})
.then((conn) => {
    console.log("..Connection Established with--_Library!!");
})
.catch((err) => {
    console.log("..Something went Wrong while connecting to Library!!");
})

let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server has started....");
})

const getData = async()=>{
    console.log(await Owner.find());
}
getData()
// module.exports.createToken = ((password)=>{
//     return jwt.sign(password,)
// })
