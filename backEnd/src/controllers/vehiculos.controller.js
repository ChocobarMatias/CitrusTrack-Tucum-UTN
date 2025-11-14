const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllVehiculos = async (req, res, next) => { 
    try {
        const sql = 'SELECT * FROM Vehiculos WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron vehículos activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getVehiculosById = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Vehiculos WHERE id_vehiculo = ? AND activo = 1';
        const vehiculo = await queryOne(sql, [id], 'Vehículo no encontrado');
        res.json(vehiculo);
    } catch (error) {
        next(error);
    } 
}

const createVehiculo = async (req, res, next) => {
    try {
        const { patente, tipo, capacicad } = req.body;
        const sql = 'INSERT INTO Vehiculos (patente, tipo, capacicad, activo) VALUES (?, ?, ?, ?)';
        const results = await queryMutation(sql, [patente, tipo, capacicad, 1]);
        res.status(201).json({ message: 'Vehículo creado exitosamente', vehiculoId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { patente, tipo, capacicad } = req.body;
        const sql = 'UPDATE Vehiculos SET patente = ?, tipo = ?, capacicad = ? WHERE id_vehiculo = ? AND activo = 1';
        await queryMutation(sql, [patente, tipo, capacicad, id], 'Vehículo no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Vehículo actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteVehiculo = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const sql = 'UPDATE Vehiculos SET activo = 0 WHERE id_vehiculo = ? AND activo = 1';
        await queryMutation(sql, [id], 'Vehículo no encontrado o ya eliminado', 404);
        res.json({ message: 'Vehículo eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllVehiculos,
    getVehiculosById,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
}