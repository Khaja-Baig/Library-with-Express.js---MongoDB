const express = require("express")
const morgan = require("morgan")
const booksRouter = require("./Owner/Routes/booksRoutes")
const usersRouter = require("./Owner/Routes/userRoutes")
const authRouter = require('./Owner/Routes/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth} = require("./Owner/authMiddleware")



let app = express();
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/Owner/books',requireAuth,booksRouter)
app.use('/api/v1/Owner/users',requireAuth,usersRouter)
app.use('/api/v1/Owner',authRouter)


module.exports = app;
