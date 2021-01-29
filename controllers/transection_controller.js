const { pool } = require('../dbConfig');
const { riceInMachine , riceInMachineEdit , riceType } = require('../model/rice_model');
const functionForData = require('../function/functionForData');
const moment = require('moment');



// Data for response api
let resData = {
    status : "",
    statusCode : 200 ,
    data : ""
}
// varible 
let sql = "" ;