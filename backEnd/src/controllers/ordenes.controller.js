const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllOrdenes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Ordenes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron órdenes activas');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getOrdenesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Ordenes WHERE id_orden = ? AND activo = 1';
        const orden = await queryOne(sql, [id], 'Orden no encontrada');
        res.json(orden);
    } catch (error) {
        next(error);
    }
}

const createOrden = async (req, res, next) => {
    try {
        const { codigo_orden, id_cliente, id_viaje, fecha_creacion, fecha_estimada, estado, confirmacion_cliente, fecha_confirmacion } = req.body;
        const sql = 'INSERT INTO Ordenes (codigo_orden, id_cliente, id_viaje, fecha_creacion, fecha_estimada, estado, confirmacion_cliente, fecha_confirmacion, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)';
        const result = await queryMutation(sql, [codigo_orden, id_cliente, id_viaje, fecha_creacion, fecha_estimada, estado, confirmacion_cliente, fecha_confirmacion]);
        res.status(201).json({ message: 'Orden creada', id: result.insertId });
    } catch (error) {
        next(error);
    }
}

const updateOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { codigo_orden, id_cliente, id_viaje, fecha_creacion, fecha_estimada, estado, confirmacion_cliente, fecha_confirmacion } = req.body;
        const sql = 'UPDATE Ordenes SET codigo_orden = ?, id_cliente = ?, id_viaje = ?, fecha_creacion = ?, fecha_estimada = ?, estado = ?, confirmacion_cliente = ?, fecha_confirmacion = ? WHERE id_orden = ? AND activo = 1';
        await queryMutation(sql, [codigo_orden, id_cliente, id_viaje, fecha_creacion, fecha_estimada, estado, confirmacion_cliente, fecha_confirmacion, id], 'Orden no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Orden actualizada' });
    } catch (error) {
        next(error);
    }
}

const deleteOrden = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Ordenes SET activo = 0 WHERE id_orden = ? AND activo = 1';
        await queryMutation(sql, [id], 'Orden no encontrada o ya eliminada', 404);
        res.json({ message: 'Orden eliminada' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllOrdenes,
    getOrdenesById,
    createOrden,
    updateOrden,
    deleteOrden
}