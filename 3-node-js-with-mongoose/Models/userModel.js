const mongoose = require('mongoose');
const validator = require('validator')

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
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password']
    }
    
})

// user Model
const User = mongoose.model('User', userSchema)

module.exports = User;