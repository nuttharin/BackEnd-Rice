const express = require('express');
const router = express.Router();

const riceControllers = require('../controllers/rice_controller');




//routes
//endpoint


//rice in machine
router.get('/machine/riceTypeMachine/get', riceControllers.getRiceTypeInMachine);
router.post('/machine/riceTypeMachine/create', riceControllers.addRiceTypeInMachine);
router.put('/machine/riceTypeMachine/update',riceControllers.updateRiceTypeInMachine); 
router.delete('/machine/riceTypeMachine/:id_machine_rice',riceControllers.deleteRiceTypeInMachine);


//POST


module.exports = router ;