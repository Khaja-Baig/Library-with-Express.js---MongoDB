const mongoose = require("mongoose")
const fs = require('fs');

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is a required field!! "],
        unique: true,
        trim: true,
        maxlength: [20,"Book name must be less than or equal to 20 characters only!! "],
        minlength: [3,"Book name must be atleast 3 characters!! "]
    },
    description:{
        type: String,
        trim: true,
        required: [true,"Description is a required field!! "]
    },
    author: {
        type: String,
        trim: true,
        required: [true, "Auther is a required field!!"]
    },
    publishedYear: {
        type: Number,
        required: [true,"Genre is a required field!! "]
    },
    publishedDate: {
        type: Date,
        required: [true,"Genre is a required field!! "]
    },
    publisher: {
        type: [String],
        trim: true
    },
    genre:{
        type: [String],
        required: [true,"Genre is a required field!! "]
    },
    rating:{
        type: Number,
        default: 2.0,
        min: [1,"Book name must be 1.0 or above!! "],
        max: [10,"Book name must be 10.0 or below!! "]
    },
    storedAt: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: [true,"Price is a required field!! "]
    },
    available:{
        type: Number,
        required: [true,"Availability/Count is a required field!! "]
    },
    image: {
        type: String,
        trim: true,
        required: [true,"Image is a required field!! "]
    },
    createdBy: String
})

bookSchema.pre('save',function(next){
    this.createdBy = "Khaja Baig";
    next()
})

bookSchema.pre(/^find/, function(next){
    this.find({publishedDate: {$lte: Date.now()}});
    next()
});

bookSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {publishedYear: {$lte: new Date()}}});
    next()
})

bookSchema.post('save',function(doc,next){
    const info = `A new Book named ${doc.name} has been added by ${doc.createdBy}\n`
    fs.writeFileSync('./LogInfos/Books-added-infos.txt', info, {flag:'a'}, (err) => {
        console.log(err.message);
    });
    next()
})


const Book = mongoose.model('Book',bookSchema);

module.exports = Book;