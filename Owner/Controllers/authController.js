const Owner = require('./../Models/ownerModel')
const jwt = require("jsonwebtoken")

const Age = 3 * 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({id}, "SecretKey", {
        expiresIn: Age
    })
}



exports.signup_post = async(req,res) => {
    try{
        const {email, password} = req.body;
        const owner = await Owner.create({email, password})
        const token = createToken(owner._id)
        res.cookie('jwt', token, {httpOnly:true, Age:Age*1000})
        res.status(201).json({
            status: "success",
            owner: owner._id
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.login_post = async(req,res) => {
    try{
        const {email, password} = req.body;
        const owner = await Owner.login(email, password);
        const token = createToken(owner._id)
        res.cookie('jwt', token, {httpOnly:true, Age:Age*1000})
        res.status(200).json({
            status: "success",
            owner: owner._id
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}


exports.logout_get = async(req,res) => {
    res.cookie('jwt','',{Age:1})
    res.status(200).json({
        status: "success",
        message: "you are logged out!!" 
    })
}