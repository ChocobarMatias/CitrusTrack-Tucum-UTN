const { query, queryOne, queryMutation } = require('../db');
const { get } = require('../router');

const getAllLecturasIoT = async (req, res, next) => { 
    try {
        const sql = 'SELECT * FROM LecturasIoT WHERE activo = 1';
        const results = await query(sql);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getLecturaIoTById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM LecturasIoT WHERE id_lectura = ? AND activo = 1';
        const lectura = await queryOne(sql, [id], 'Lectura no encontrada');
        res.json(lectura);
    } catch (error) {
        next(error);
    }
}

const createLecturaIoT = async (req, res, next) => {
    try {
        const { id_caja, temperatura, humedad, golpe, velocidad_cinta, fecha } = req.body;
        const sql = 'INSERT INTO LecturasIoT (id_caja, temperatura, humedad, golpe, velocidad_cinta, fecha, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [id_caja, temperatura, humedad, golpe, velocidad_cinta, fecha, 1]);
        res.status(201).json({ message: 'Lectura IoT creada exitosamente', lecturaId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateLecturaIoT = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_caja, temperatura, humedad, golpe, velocidad_cinta, fecha } = req.body;
        const sql = 'UPDATE LecturasIoT SET id_caja = ?, temperatura = ?, humedad = ?, golpe = ?, velocidad_cinta = ?, fecha = ? WHERE id_lectura = ? AND activo = 1';
        await queryMutation(sql, [id_caja, temperatura, humedad, golpe, velocidad_cinta, fecha, id], 'Lectura no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Lectura IoT actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteLecturasIoT = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE LecturasIoT SET activo = 0 WHERE id_lectura = ? AND activo = 1';
        await queryMutation(sql, [id], 'Lectura no encontrada o ya eliminada', 404);
        res.json({ message: 'Lectura IoT eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllLecturasIoT,
    getLecturaIoTById,
    createLecturaIoT,
    updateLecturaIoT,
    deleteLecturasIoT
}