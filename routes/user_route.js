const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user_controller');




//routes
//endpoint


//GET
router.get('/machine/informationPhone/get', userControllers.getInformationForPhone);

//POST


module.exports = router ;