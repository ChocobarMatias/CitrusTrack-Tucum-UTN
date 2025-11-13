const express = require('express');
const router = express.Router();
const {getAllUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario} = require('../controllers/usuarios.controller');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/',verifyToken,getAllUsuarios);
router.get('/:id',verifyToken,getUsuarioById);
router.post('/',verifyToken,createUsuario);
router.put('/:id', verifyToken, updateUsuario);
router.delete('/:id', verifyToken, deleteUsuario);

module.exports = router;