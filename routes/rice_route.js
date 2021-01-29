const express = require('express');
const router = express.Router();

const riceControllers = require('../controllers/rice_controller');




//routes
//endpoint

//---------------------------------------- ricetype ------------------------------------------------//
router.get('/riceType/get',riceControllers.getRiceType);
router.post('/riceType/create',riceControllers.addRiceType);
router.put('/riceType/update',riceControllers.updateRiceType);
router.delete('/riceType/:id_rice_type',riceControllers.deleteRiceType);


//---------------------------------------------------------------------------------------------------//




//---------------------------------ricetype join with machine----------------------------------------//
router.get('/machine/riceTypeMachine/get', riceControllers.getRiceTypeInMachine);
router.post('/machine/riceTypeMachine/create', riceControllers.addRiceTypeInMachine);
router.put('/machine/riceTypeMachine/update',riceControllers.updateRiceTypeInMachine); 
router.delete('/machine/riceTypeMachine/:id_machine_rice',riceControllers.deleteRiceTypeInMachine);
//---------------------------------------------------------------------------------------------------//

//POST


module.exports = router ;