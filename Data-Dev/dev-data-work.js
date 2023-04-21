const mongoose = require('mongoose')
const dotenv = require("dotenv")
const fs = require('fs')
dotenv.config({path: './config.env'})

const Book = require('./../Models/bookModel')


mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
})
.then((conn) => {
    console.log("..Connection Established!!");
})
.catch((err) => {
    console.log("..Something went Wrong!!");
})

const books = JSON.parse(fs.readFileSync('./Data-dev/books.json', 'utf-8'))


const deleteData = async () => {
    try{
        await Book.deleteMany();
        console.log("Data Deleted!! ")
    }
    catch(err){
        console.log(" Some error occurred!! ");
    }
    process.exit();
}

const importData = async () => {
    try{
        await Book.create(books);
        console.log("Data Imported!! ")
    }
    catch(err){
        console.log(" Some error occurred!! ");
    }
    process.exit();
}


if(process.argv[2] === "--import"){
    importData();
}
if(process.argv[2] === "--delete"){
    deleteData();
}
