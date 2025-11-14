const express = require('express');
const router = express.Router();
const { getAllLecturasIot, getLecturaIotById, createLecturaIot, updateLecturaIot, deleteLecturaIot } = require('../controllers/lecturas.iot.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/lecturas-iot', verifyToken, getAllLecturasIot);
router.get('/lecturas-iot/:id', verifyToken, getLecturaIotById);
router.post('/lecturas-iot', verifyToken, createLecturaIot);
router.put('/lecturas-iot/:id', verifyToken, updateLecturaIot);
router.delete('/lecturas-iot/:id', verifyToken, deleteLecturaIot);

module.exports = router;