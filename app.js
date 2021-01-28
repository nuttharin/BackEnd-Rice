const express = require('express');

const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app  = express();

// const mongoClient = require('mongodb');



require('dotenv').config()




app.use(morgan('dev')); // เเสดงการทำงาน


app.use(bodyParser.urlencoded({extended : false})); // false ใช้อัลกอในการ map json ธรรมดา ,true = high
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('uploads'));

//---------------Access-Control-Allow-Origin----------
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept,Authorization,authorization,content-type');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); // ไปต่อ
})





//set route

//const machineRoute = require('./routes/machine_route');
const userRoute = require('./routes/user_route');
const riceRoute = require('./routes/rice_route');
const machineRoute = require('./routes/machine_route');


//app.use('/machine',machineRoute);
app.use('/user',userRoute);
app.use('/rice',riceRoute);

module.exports = app ;