const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllOrdenesCajas = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Ordenes_Cajas WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron órdenes cajas activas');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getOrdenCajabyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Ordenes_Cajas WHERE id_orden_caja = ? AND activo = 1';
        const ordenCaja = await queryOne(sql, [id], 'Orden caja no encontrada');
        res.json(ordenCaja);
    } catch (error) {
        next(error);
    }
}

const createOrdenCaja = async (req, res, next) => {
    try {
        const { id_orden, id_caja } = req.body;
        const sql = 'INSERT INTO Ordenes_Cajas (id_orden, id_caja, activo) VALUES (?, ?, ?)';
        const results = await queryMutation(sql, [id_orden, id_caja, 1]);
        res.status(201).json({ message: 'Orden caja creada exitosamente', ordenCajaId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateOrdenCaja = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_orden, id_caja } = req.body;
        const sql = 'UPDATE Ordenes_Cajas SET id_orden = ?, id_caja = ? WHERE id_orden_caja = ? AND activo = 1';
        await queryMutation(sql, [id_orden, id_caja, id], 'Orden caja no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Orden caja actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteOrdenCaja = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Ordenes_Cajas SET activo = 0 WHERE id_orden_caja = ? AND activo = 1';
        await queryMutation(sql, [id], 'Orden caja no encontrada o ya eliminada', 404);
        res.json({ message: 'Orden caja eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllOrdenesCajas,
    getOrdenCajabyId,
    createOrdenCaja,
    updateOrdenCaja,
    deleteOrdenCaja
}