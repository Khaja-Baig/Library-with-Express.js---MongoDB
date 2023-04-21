const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require("bcrypt")

const ownerSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is a required field!! "],
        unique: true,
        validate: [validator.isEmail,'Please enter a valid email address!!'],
        lowercase: true,
      },
    password:{
        type:String,
        require:[true,"Password is required!!"],
        validate: {
            validator: function(v) {
              return validator.isStrongPassword(v, { minSymbols: 0 });
            },
            message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number`
        }
    }
})

// Hashing the password with bcrypt
ownerSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// method to login owner
ownerSchema.statics.login = async function(email, password){
    const owner = await this.findOne({email});
    if(owner){
        const auth = await bcrypt.compare(password, owner.password);
        if(auth){
            return owner;
        }
        throw Error('Incorrect Password')

    }
    throw Error('Incorrect email')
}


const Owner = mongoose.model('Owner',ownerSchema)
module.exports = Owner;
