const express = require('express');
const router = express.Router();
const { getAllLotes, getLoteById, createLote, updateLote, deleteLote } = require('../controllers/lotes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/lotes', verifyToken, getAllLotes);
router.get('/lotes/:id', verifyToken, getLoteById);
router.post('/lotes', verifyToken, createLote);
router.put('/lotes/:id', verifyToken, updateLote);
router.delete('/lotes/:id', verifyToken, deleteLote);

module.exports = router;