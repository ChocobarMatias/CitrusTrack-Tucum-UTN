const express = require('express');
const router = express.Router();
const { getAllChoferesVehiculos, getChoferVehiculoById, createChoferVehiculo, updateChoferVehiculo, deleteChoferVehiculo } = require('../controllers/choferes.vehiculos.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/choferes-vehiculos', verifyToken, getAllChoferesVehiculos);
router.get('/choferes-vehiculos/:id', verifyToken, getChoferVehiculoById);
router.post('/choferes-vehiculos', verifyToken, createChoferVehiculo);
router.put('/choferes-vehiculos/:id', verifyToken, updateChoferVehiculo);
router.delete('/choferes-vehiculos/:id', verifyToken, deleteChoferVehiculo);

module.exports = router;