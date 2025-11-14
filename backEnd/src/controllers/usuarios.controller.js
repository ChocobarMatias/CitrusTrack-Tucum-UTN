const { hashPassword } = require('../utils/hash.utils');
const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllUsuarios = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM usuarios WHERE activo = 1';
    const results = await queryWithResults(sql, [], 'No se encontraron usuarios activos');
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id = ? AND activo = 1';
    const usuario = await queryOne(sql, [id], 'Usuario no encontrado');
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const createUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const sql = 'INSERT INTO usuarios (nombre, email, password, activo) VALUES (?, ?, ?, ?)';
    const results = await queryMutation(sql, [nombre, email, hashedPassword, 1], 'No se pudo crear el usuario');
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
  } catch (error) {
    next(error);
  }
};

const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ? AND activo = 1';
    await queryMutation(sql, [nombre, email, hashedPassword, id], 'Usuario no encontrado o no se pudo actualizar', 404);
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = 'UPDATE usuarios SET activo = 0 WHERE id = ? AND activo = 1';
    await queryMutation(sql, [id], 'Usuario no encontrado o ya eliminado', 404);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };