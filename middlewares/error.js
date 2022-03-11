const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err}

    console.log("this is error",error);
    error.message = err.message;
    //Log to console for dev
    console.log(err.name);


    //Bad id or resource not found
    if(err.name === "CastError"){
        const message = `Resource not found with the id of ${err.value}`;
        error = new ErrorResponse(message, 404);

        
    }
    //Duplicate key error
    if(err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    if(err.name ==="ValidationError"){
       const message = Object.values(err.errors).map(val => val.message);
        //const message = Object.values(err.errors).map(val => val.message)
    
        error.message = message;
    }

    res.status(error.statusCode || 500).send({
        success: false,
        error: error.message || "Something went wrong we will be working on it soon"
    })
}

module.exports = errorHandler;