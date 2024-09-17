const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}
const prodErrors = () => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
            
        })
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Somthing went wrong...'
        })
    }
}
module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status ||'error'
    
    if(process.env.NODE_DEV === 'development'){
        devErrors(res, error)
    } else if(process.env.NODE_DEV === 'development'){
        prodErrors(res, error)
    
}
}