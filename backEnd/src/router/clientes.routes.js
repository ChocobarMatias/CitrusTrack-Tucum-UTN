const express = require('express');
const router = express.Router();
const {getAllClientes,  getClienteById, createCliente, updateCliente, deleteCliente} = require('../controllers/clientes.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/clientes', verifyToken, getAllClientes);
router.get('/clientes/:id', verifyToken, getClienteById);
router.post('/clientes', verifyToken, createCliente);
router.put('/clientes/:id', verifyToken, updateCliente);
router.delete('/clientes/:id', verifyToken, deleteCliente);

module.exports = router;