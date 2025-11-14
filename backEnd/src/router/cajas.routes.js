const express = require('express');
const router = express.Router();
const { getAllCajas, getCajaById, createCaja, updateCaja, deleteCaja } = require('../controllers/cajas.controller');
const verifyToken = require('../middleware/verifyToken');

routes.get('/cajas', verifyToken, getAllCajas);
router.get('/cajas/:id', verifyToken, getCajaById);
router.post('/cajas', verifyToken, createCaja);
router.put('/cajas/:id', verifyToken, updateCaja);
router.delete('/cajas/:id', verifyToken, deleteCaja);

module.exports = router;