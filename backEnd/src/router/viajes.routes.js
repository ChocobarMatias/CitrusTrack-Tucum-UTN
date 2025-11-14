const express = require('express');
const router = express.Router();
const { getAllViajes, getViajesById, createViaje, updateViaje, deleteViaje } = require('../controllers/viajes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/viajes', verifyToken, getAllViajes);
router.get('/viajes/:id', verifyToken, getViajesById);
router.post('/viajes', verifyToken, createViaje);
router.put('/viajes/:id', verifyToken, updateViaje);
router.delete('/viajes/:id', verifyToken, deleteViaje);

module.exports = router;