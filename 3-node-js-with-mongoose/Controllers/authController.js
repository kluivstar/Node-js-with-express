const User = require('./../Models/userModel')
const asyncErrorHandler = require('./../Utils/asyncErrorHandler')

// asyncErrorHandler catches error for exception i.e if a user is not created
exports.signup = asyncErrorHandler(async (req, res, next) =>{
    const newUser = await User.create(req.body)

    // if a user is created
    res.status(201).json({
        status: "success.",
        data: {
            user: newUser
        }
    })
})