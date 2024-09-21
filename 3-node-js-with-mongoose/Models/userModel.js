const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
// user Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"]
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(val){
                return val == this.password
            },
            message: "Password and Confirm password don't match"
        }
    }
    
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
        // encrypt password before saving it
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmPassword = undefined
        next()
})

// logging in a user by comparing credentials
userSchema.methods.comparePasswordInDb = async function(pswd, pswdDB){
    return await bcrypt.compare(pswd, pswdDB)
}
// user Model
const User = mongoose.model('User', userSchema)

module.exports = User;