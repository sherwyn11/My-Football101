const mongoose = require('mongoose')
const validator = require('validator')

 const User = mongoose.model('Users',{
    name: {
        type: String
    },
    contact: {
        type: String,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Invalid Contact')
            }       
        }
    },
    email: {
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }       
        }
    },
    favTeam: {
        type: String
    },
    password:{
        type: String
    }
 })

 module.exports = User