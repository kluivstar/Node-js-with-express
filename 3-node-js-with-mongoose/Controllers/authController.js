const User = require('./../Models/userModel')
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const customError = require('./../Utils/CustomError')

// reuseable sign Token 
const signToken = id => {
    return jwt.sign({id}, process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES})
}
// RHF handles signing up a user
// asyncErrorHandler catches error for exception i.e if a user is not created
exports.signup = asyncErrorHandler(async (req, res, next) =>{
    const newUser = await User.create(req.body)

    const token = signToken(newUser._id)
    // if a user is created
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
})

// RHF handles logging in a user
exports.login = asyncErrorHandler(async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if(!email || !password){
        const error = new customError("Kindly enter an email or a password", 400)
        return next(error)
    }

    const user = await User.findOne({email}).select('+password')

    //const isMatch = await user.comparePasswordInDb(password, user.password)

    if (!user || !(await user.comparePasswordInDb(password, user.password))){
        const error = new customError('Incorrect credentials', 400)
        return next(error)
    }

    const token = signToken(user._id)
    res.status(200).json({
        status: "success",
        token,
        user
    })
})