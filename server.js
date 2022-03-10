const express = require('express');
const dotenv = require('dotenv');


//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT

app.listen( PORT || 5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
