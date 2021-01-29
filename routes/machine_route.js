const express = require('express');
const router = express.Router();

const machineControllers = require('../controllers/machine_controller');




//routes
//endpoint

//---------------------------------------- ricetype ------------------------------------------------//
router.get('/machineRice/get',machineControllers.getMachine);
router.get('/machineRice/getById',machineControllers.getMachineById)
router.post('/machineRice/create',machineControllers.addMachine);
router.put('/machineRice/update',machineControllers.updateMachine);
router.delete('/machineRice/:id_machine',machineControllers.deleteMachine);

//---------------------------------------------------------------------------------------------------//


module.exports = router ;