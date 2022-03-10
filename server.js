const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger')
var morgan = require('morgan')
//Route Files
const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({path: './config/config.env'});


const app = express();


//Middlewares

// app.use(logger)

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)





const PORT = process.env.PORT

app.listen( PORT || 5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

