const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger')
var morgan = require('morgan')
const errorHandler = require('./middlewares/error')
const connectDb = require('./config/db');
//Route Files
const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({path: './config/config.env'});

//Connect to the database
connectDb();

const app = express();


//Middlewares

// Body parser
app.use(express.json());

// app.use(logger)

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)
app.use(errorHandler);




const PORT = process.env.PORT

const server = app.listen( PORT || 5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));



//Handled unhandled promise rejction
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server and exit process
    server.close(() => process.exit())
})