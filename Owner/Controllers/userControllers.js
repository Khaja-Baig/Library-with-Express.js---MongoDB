const { params } = require("../Routes/userRoutes")
const User = require("../Models/userModel")
const ApiFeatures = require('./../Classes/ApiFeatures')

module.exports.getAllUser = async (req,res) => {
    try{
        const features = new ApiFeatures(User.find(),req.query).filter().sort().projection().paginate();

        const users = await features.query;

        res.status(200).json({
            status: "success",
            length: users.length,
            data:{
                users
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

module.exports.getUserbyId = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data:{
                user
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}

module.exports.createUser = async (req,res) => {
    try{
        const user = await user.create(req.body)
        res.status(201).json({
            status: "success",
            data: {
                user
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

module.exports.updateUser = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.status(200).json({
            status: "success",
            data: {
                user
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

module.exports.deleteUser = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
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

module.exports.deleteAllUser = async (req,res) => {
    try{
        await User.deleteMany()
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

// exports.getUserStats = (req,res) => {
//     try{

//     }
//     catch(err){
//         res.status(404).json({
//             status: "failed",
//             message: err.message
//         })
//     }
// }