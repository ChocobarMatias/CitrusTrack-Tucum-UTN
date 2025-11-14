const express = require('express');
const router = express.Router();
const { getAllIndicadores, getIndicadorById, createIndicador, updateIndicador, deleteIndicador } = require('../controllers/indicadores.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/indicadores', verifyToken, getAllIndicadores);
router.get('/indicadores/:id', verifyToken, getIndicadorById);
router.post('/indicadores', verifyToken, createIndicador);
router.put('/indicadores/:id', verifyToken, updateIndicador);
router.delete('/indicadores/:id', verifyToken, deleteIndicador);

module.exports = router;