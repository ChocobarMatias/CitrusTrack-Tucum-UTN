const {Router} = require('express');
const router = Router();
const usuariosRoutes = require('./usuarios.routes');
const loginRoutes = require('./login.routes');

router.use('/login', loginRoutes);
router.use('/users', usuariosRoutes);


module.exports = router;