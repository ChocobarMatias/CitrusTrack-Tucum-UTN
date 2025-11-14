const express = require('express');
const router = express.Router();
const { getAllOrdenesCajas, getOrdenCajabyId, createOrdenCaja, updateOrdenCaja, deleteOrdenCaja } = require('../controllers/ordenes.cajas.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/ordenes-cajas', verifyToken, getAllOrdenesCajas);
router.get('/ordenes-cajas/:id', verifyToken, getOrdenCajabyId);
router.post('/ordenes-cajas', verifyToken, createOrdenCaja);
router.put('/ordenes-cajas/:id', verifyToken, updateOrdenCaja);
router.delete('/ordenes-cajas/:id', verifyToken, deleteOrdenCaja);

module.exports = router;