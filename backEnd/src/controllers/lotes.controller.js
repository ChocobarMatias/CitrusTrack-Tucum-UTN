const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllLotes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Lotes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron lotes activos');
        res.json(results);
    }
    catch (error) {
        next(error);
    }
}

const getLoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Lotes WHERE id_lote = ? AND activo = 1';
        const lote = await queryOne(sql, [id], 'Lote no encontrado');
        res.json(lote);
    } catch (error) {
        next(error);
    }

}

const createLote = async (req, res, next) => {
    try {
        const { codigo_lote, id_producto, planta, linea, fecha_creacion } = req.body;
        const sql = 'INSERT INTO Lotes (codigo_lote, id_producto, planta, linea, fecha_creacion, activo) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [codigo_lote, id_producto, planta, linea, fecha_creacion, 1]);
        res.status(201).json({ message: 'Lote creado exitosamente', loteId: results.insertId });
    } catch (error) {
        next(error);
    }

}

const updateLote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { codigo_lote, id_producto, planta, linea, fecha_creacion } = req.body;
        const sql = 'UPDATE Lotes SET codigo_lote = ?, id_producto = ?, planta = ?, linea = ?, fecha_creacion = ? WHERE id_lote = ? AND activo = 1';
        await queryMutation(sql, [codigo_lote, id_producto, planta, linea, fecha_creacion, id], 'Lote no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Lote actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteLote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Lotes SET activo = 0 WHERE id_lote = ? AND activo = 1';
        const results = await queryMutation(sql, [id], 'Lote no encontrado o ya eliminado', 404);
        res.json({ message: 'Lote eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllLotes,
    getLoteById,
    createLote,
    updateLote,
    deleteLote
}