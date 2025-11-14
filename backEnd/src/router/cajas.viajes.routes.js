const express = require('express');
const router = express.Router();
const { getAllCajasViajes, getCajaViajeById, createCajaViaje, updateCajaViaje, deleteCajaViaje } = require('../controllers/cajas.viajes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/cajas-viajes', verifyToken, getAllCajasViajes);
router.get('/cajas-viajes/:id', verifyToken, getCajaViajeById);
router.post('/cajas-viajes', verifyToken, createCajaViaje);
router.put('/cajas-viajes/:id', verifyToken, updateCajaViaje);
router.delete('/cajas-viajes/:id', verifyToken, deleteCajaViaje);

module.exports = router;