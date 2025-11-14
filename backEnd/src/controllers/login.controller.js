const {pool} = require('../config/db');
const {compararePassword} = require('../utils/hash.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const loginUser = (req, res) => {

    const {email, password} = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND activo = 1';

    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error al verificar el Usuario:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
        }

        if( results.length > 0 ){
            const user = results[0];
            const passwordMatch = compararePassword(password, user.password);

            if(!passwordMatch){
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
           if(email === user.email && passwordMatch){
            const token = jwt.sign({ id: user.id, email: user.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' });
            return res.json({ "Inicio de sesión Exitoso ": token });}else {
                return res.status(401).json({ message: 'Credenciales inválidas' });
        }}
    });
};

module.exports = { loginUser };