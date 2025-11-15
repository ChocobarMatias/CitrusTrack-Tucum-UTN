const express = require('express');
const router = express.Router();
const { getAllOrdenes, getOrdenesById, createOrden, updateOrden, deleteOrden } = require('../controllers/ordenes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/ordenes', verifyToken, getAllOrdenes);
router.get('/ordenes/:id', verifyToken, getOrdenesById);
router.post('/ordenes', verifyToken, createOrden);
router.put('/ordenes/:id', verifyToken, updateOrden);
router.delete('/ordenes/:id', verifyToken, deleteOrden); 

module.exports = router;
