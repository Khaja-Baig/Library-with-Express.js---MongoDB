const express = require("express")
const booksControllers = require('./../Controllers/booksControllers')

const router = express.Router();

router.route('/top-rated')
    .get(booksControllers.topRated,booksControllers.getAllBooks);

router.route('/book-stats')
    .get(booksControllers.getBookStats);

router.route('/book-by-genre/:genre')
    .get(booksControllers.BooksByGenre)


router.route('/')
    .get(booksControllers.getAllBooks)
    .post(booksControllers.createBook)
    .delete(booksControllers.deleteAllBooks)

router.route('/:id')
    .get(booksControllers.getBookbyId)
    .patch(booksControllers.updateBook)
    .delete(booksControllers.deleteBook)

module.exports = router;