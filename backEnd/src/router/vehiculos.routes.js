const express = require('express');
const router = express.Router();
const { getAllVehiculos, getVehiculosById, createVehiculo, updateVehiculo, deleteVehiculo } = require('../controllers/vehiculos.controller');
const verifyToken = require('../middleware/verifyToken');

routes.get('/vehiculos', verifyToken, getAllVehiculos);
router.get('/vehiculos/:id', verifyToken, getVehiculosById);
router.post('/vehiculos', verifyToken, createVehiculo);
router.put('/vehiculos/:id', verifyToken, updateVehiculo);
router.delete('/vehiculos/:id', verifyToken, deleteVehiculo);

module.exports = router;