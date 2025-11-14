const express = require('express');
const router = express.Router();
const { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/productos', verifyToken, getAllProductos);
router.get('/productos/:id', verifyToken, getProductoById);
router.post('/productos', verifyToken, createProducto);
router.put('/productos/:id', verifyToken, updateProducto);
router.delete('/productos/:id', verifyToken, deleteProducto);

module.exports = router;