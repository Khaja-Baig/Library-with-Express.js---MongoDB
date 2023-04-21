const jwt = require('jsonwebtoken')

const requireAuth = (req,res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, "SecretKey", (err, decodedToken )=>{
            if(err){
                res.status(404).json({
                    status: 'failed',
                    message: err.message
                })
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(404).json({
            status: 'failed',
            message: 'login to enter'
        })
    }
}

module.exports = {requireAuth} 