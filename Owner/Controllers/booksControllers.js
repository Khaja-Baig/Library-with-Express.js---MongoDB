const { params } = require("../Routes/booksRoutes")
const Book = require("../Models/bookModel")
const ApiFeatures = require('./../Classes/ApiFeatures')



module.exports.topRated = (req,res,next) => {
    req.query.limit = "3"
    req.query.sort = "-rating"
    next()
}

module.exports.getAllBooks = async (req,res) => {
    try{

        const features = new ApiFeatures(Book.find(),req.query).filter().sort().projection().paginate();

        const books = await features.query;

        res.status(200).json({
            status: "success",
            length: books.length,
            data:{
                books
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports.getBookbyId = async (req,res) => { 
    try{
        const book = await Book.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data:{
                book
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports.createBook = async (req,res) => {
    try{
        const book = await Book.create(req.body)
        res.status(201).json({
            status: "success",
            data: {
                book
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports.updateBook = async (req,res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.status(200).json({
            status: "success",
            data: {
                book
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports.deleteBook = async (req,res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports.deleteAllBooks = async (req,res) => {
    try{
        await Book.deleteMany()
        res.status(201).json({
            status: "success",
            data: null
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}

module.exports.getBookStats = async (req,res) => {
    try{
        const stats = await Book.aggregate([
            { $group: {
                _id: "$publishedYear",
                avgRating: { $avg: "$rating"},
                avgPrice: { $avg: "$price"},
                minPrice: { $min: "$price"},
                maxPrice: { $max: "$price"},
                TotalPrice: { $sum: "$price"},
                bookCount: { $sum: 1}
            }},

            { $sort: { minPrice: 1}}

        ]);

        res.status(200).json({
            status: "success",
            length: stats.length,
            data: {
                stats:stats
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}

module.exports.BooksByGenre = async (req,res) => {
    try{
        const genre = req.params.genre;
        const books = await Book.aggregate([
            { $unwind: "$genre"},
            {$group: {
                _id: "$genre",
                bookCount: {$sum: 1},
                books: {$push: "$name"}
            }},
            {$addFields: {genre: "$_id"}},
            {$project: {_id: 0}},
            {$sort: {bookCount: -1}},
            // {$limit:2}
            {$match: {genre: genre}}
        ])

        res.status(200).json({
            status: "success",
            length: books.length,
            data: {
                books
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}