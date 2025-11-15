const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllCajasViajes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Cajas_Viajes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron cajas viajes activas');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getCajaViajeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Cajas_Viajes WHERE id_caja_viaje = ? AND activo = 1';
        const cajaViaje = await queryOne(sql, [id], 'Caja viaje no encontrada');
        res.json(cajaViaje);
    } catch (error) {
        next(error);
    }
}

const createCajaViaje = async (req, res, next) => {
    try {
        const {  id_caja, id_viaje } = req.body;
        const sql = 'INSERT INTO Cajas_Viajes (id_caja, id_viaje, activo) VALUES (?, ?, ?)';
        const results = await queryMutation(sql, [id_caja, id_viaje, 1]);
        res.status(201).json({ message: 'Caja viaje creada exitosamente', cajaViajeId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateCajaViaje = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_caja, id_viaje } = req.body;
        const sql = 'UPDATE Cajas_Viajes SET id_caja = ?, id_viaje = ? WHERE id_caja_viaje = ? AND activo = 1';
        await queryMutation(sql, [id_caja, id_viaje, id], 'Caja viaje no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Caja viaje actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteCajaViaje = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Cajas_Viajes SET activo = 0 WHERE id_caja_viaje = ? AND activo = 1';
        await queryMutation(sql, [id], 'Caja viaje no encontrada o ya eliminada', 404);
        res.json({ message: 'Caja viaje eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCajasViajes,
    getCajaViajeById,
    createCajaViaje,
    updateCajaViaje,
    deleteCajaViaje
}