const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load Models
 const bootcamp = require('./models/Bootcamp');
const Bootcamp = require('./models/Bootcamp');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
   });

//Read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

//Import into Db

const importData = async() => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported successfully')
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

//Delete Data

const deleteData = async() => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data deleted successfully')
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2]==="-i"){
    importData();
}
else if(process.argv[2]==="-d"){
    deleteData();
}