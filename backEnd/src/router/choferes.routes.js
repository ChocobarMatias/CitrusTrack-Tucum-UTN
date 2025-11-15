const express = require('express');
const router = express.Router();
const { getAllChoferes, getChoferById, createChofer, updateChofer, deleteChofer } = require('../controllers/choferes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/choferes', verifyToken, getAllChoferes);
router.get('/choferes/:id', verifyToken, getChoferById);
router.post('/choferes', verifyToken, createChofer);
router.put('/choferes/:id', verifyToken, updateChofer);
router.delete('/choferes/:id', verifyToken, deleteChofer);

module.exports = router;