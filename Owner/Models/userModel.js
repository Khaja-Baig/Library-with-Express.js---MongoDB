const mongoose = require("mongoose")
const fs = require('fs');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is a required field!! "],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is a required field!! "],
  },
  email: {
    type: String,
    required: [true, "Email is a required field!! "],
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, "Password is a required field!! "],
    validate: {
      validator: function(v) {
        return validator.isStrongPassword(v, { minSymbols: 0 });
      },
      message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number`
    },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is a required field!! "],
    unique: true
  },
  address: {
    street: {
      type: String,
      required: [true, "String is a required field!! "]

    },
    city: {
      type: String,
      required: [true, "City is a required field!! "]

    },
    state: {
      type: String,
      required: [true, "State is a required field!! "]
    },
    zip: {
      type: Number,
      required: [true, "Zip is a required field!! "]
    }
  },
  purchases: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, "Book is a required field!! "]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is a required field!! "]
    },
    price: {
      type: Number,
      required: [true, "Price is a required field!! "]
    }
  }],
  purchasedData: {
    type: Date,
    default: Date.now()
  },
  totalPurchases: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  }
}
});

// userSchema.post('save',function(doc,next){
//   const info = `A new Book named ${doc.purchases[0].book} has been bought by ${(doc.firstname + doc.lastname)}\n`
//   fs.writeFileSync('./LogInfos/User-books-bought', info, {flag:'a'}, (err) => {
//       console.log(err.message);
//   });
//   next()
// })

const User = mongoose.model('User', userSchema);

module.exports = User;



