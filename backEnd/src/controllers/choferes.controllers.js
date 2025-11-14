const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllChoferes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Choferes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron choferes activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getChoferById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Choferes WHERE id_chofer = ? AND activo = 1';
        const chofer = await queryOne(sql, [id], 'Chofer no encontrado');
        res.json(chofer);
    } catch (error) {
        next(error);
    }
}

const createChofer = async (req, res, next) => {
    try {
        const { nombre, licencia, telefono, fecha_nacimiento } = req.body;
        const sql = 'INSERT INTO Choferes (nombre, licencia, telefono, fecha_nacimiento, activo) VALUES (?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [nombre, licencia, telefono, fecha_nacimiento, 1]);
        res.status(201).json({ message: 'Chofer creado exitosamente', choferId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateChofer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, licencia, telefono, fecha_nacimiento } = req.body;
        const sql = 'UPDATE Choferes SET nombre = ?, licencia = ?, telefono = ?, fecha_nacimiento = ? WHERE id_chofer = ? AND activo = 1';
        await queryMutation(sql, [nombre, licencia, telefono, fecha_nacimiento, id], 'Chofer no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Chofer actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteChofer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Choferes SET activo = 0 WHERE id_chofer = ? AND activo = 1';
        await queryMutation(sql, [id], 'Chofer no encontrado o ya eliminado', 404);
        res.json({ message: 'Chofer eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllChoferes,
    getChoferById,
    createChofer,
    updateChofer,
    deleteChofer
}