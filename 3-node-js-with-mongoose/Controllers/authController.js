const User = require('./../Models/userModel')
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const customError = require('./../Utils/CustomError')
const util = require('util')

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
        token
    })
})

exports.protect = asyncErrorHandler(async (req, res, next) => {
    // Read the token and check if it exist
    const testToken = req.headers.authorization
    let token
    if(testToken && testToken.startsWith('Bearer')){
        token = testToken.split(' ')[1]
    }
    if(!token){
        next(new customError("You're not logged in", 400))
    }

    // validate token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR)

    // if user exists
    const user = await User.findById(decodedToken.id)
    if(!user){
        const error = new customError('The user with given token does not exist.', 401)
        next(error)
    }

    // if user changed password after token was issued
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat)
    if(isPasswordChanged){
        const error = new customError("Password was changed resently, kindly login again", 401)
        return next(error)
    }

    // allow user to access route
    req.user = user
    next()
})
exports.restrict = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            const error = new customError("You do not have permission to perform this action..", 403)
            next(error)
        }
        // allows user delete movie if role is admin by called the next MW "deleteMovie"
        next()
    }
}