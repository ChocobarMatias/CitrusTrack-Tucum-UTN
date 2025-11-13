const {pool} = require('../config/db');
const {hashPassword} = require('../utils/hash.utils');

const getAllUsuarios = (req,res)=>{
    
const sql = 'SELECT * FROM usuarios where estado = 1';

pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error al verificar el Usuario:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if( results.length === 0 ){
      return res.status(404).json({ message: 'No se encontraron usuarios activos' });
    }

    if(results.length > 0){

    res.json(results);
    }else{
      res.status(404).json({ message: 'No se encontraron usuarios activos' });
    }
  });
};

const getUsuarioById = (req,res)=>{

    const {id} = req.params;

    const sql = 'SELECT * FROM usuarios WHERE id = ? AND estado = 1';
    pool.query(sql, [id], (err, results) => {
        if (err) {
          console.error('Error al obtener el usuario por ID:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if(results[0].estado !== 1){
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if(results.length > 0){

        res.json(results[0]);}else{
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
      });
};

const createUsuario = (req,res)=>{

    const {nombre, email, password} = req.body;

    // Hash the password before storing it
    const hashedPassword = hashPassword(password);

    const sql = 'INSERT INTO usuarios (nombre, email, password, estado) VALUES (?, ?, ?, ?)';

    pool.query(sql, [nombre, email, hashedPassword,1], (err, results) => {
        if (err) {
          console.error('Error al crear el usuario:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(results.affectedRows === 0){
          return res.status(400).json({ message: 'No se pudo crear el usuario' });
        }
        if(results.affectedRows > 0){   

        res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
        }else{
          res.status(400).json({ message: 'No se pudo crear el usuario' });
        }
      });
};

const updateUsuario = (req,res)=>{
    const {id} = req.params;
    const {nombre, email, password} = req.body;
    const hashedPassword = hashPassword(password);
    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ? AND estado = 1';

    pool.query(sql, [nombre, email, hashedPassword, id], (err, results) => {
        if (err) {
          console.error('Error al actualizar el usuario:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(results.affectedRows === 0){
          return res.status(404).json({ message: 'Usuario no encontrado o no se pudo actualizar' });
        }
        if(results.affectedRows > 0){
          res.json({ message: 'Usuario actualizado exitosamente' });
        }
      });
};

const deleteUsuario = (req,res)=>{
    const {id} = req.params;

    const sql = 'UPDATE usuarios SET estado = 0 WHERE id = ? AND estado = 1';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(results.affectedRows === 0){
          return res.status(404).json({ message: 'Usuario no encontrado o ya eliminado' });
        }
        if(results.affectedRows > 0){
          res.json({ message: 'Usuario eliminado exitosamente' });
        }
    });
};


module.exports = {getAllUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario}