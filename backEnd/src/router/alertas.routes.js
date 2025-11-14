const express = require('express');
const router = express.Router();
const { getAllAlertas, getAlertaById, createAlerta, updateAlerta, deleteAlerta } = require('../controllers/alertas.controller');
const verifyToken = require('../middleware/verifyToken');

routes.get('/alertas', verifyToken, getAllAlertas);
router.get('/alertas/:id', verifyToken, getAlertaById);
router.post('/alertas', verifyToken, createAlerta);
router.put('/alertas/:id', verifyToken, updateAlerta);
router.delete('/alertas/:id', verifyToken, deleteAlerta);

module.exports = router;