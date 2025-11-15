const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllChoferesVehiculos = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Choferes_Vehiculos WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron choferes activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getChoferVehiculoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Choferes_Vehiculos WHERE id_chofer_vehiculo = ? AND activo = 1';
        const chofer = await queryOne(sql, [id], 'Chofer no encontrado');
        res.json(chofer);
    } catch (error) {
        next(error);
    }
}

const createChoferVehiculo = async (req, res, next) => {
    try {
        const { id_chofer, id_vehiculo, fecha_asignacion, fecha_desasignacion } = req.body;
        const sql = 'INSERT INTO Choferes_Vehiculos (id_chofer, id_vehiculo, fecha_asignacion, fecha_desasignacion, activo) VALUES (?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [id_chofer, id_vehiculo, fecha_asignacion, fecha_desasignacion, 1]);
        res.status(201).json({ message: 'Chofer asignado al vehículo exitosamente', choferVehiculoId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateChoferVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_chofer, id_vehiculo, fecha_asignacion, fecha_desasignacion } = req.body;
        const sql = 'UPDATE Choferes_Vehiculos SET id_chofer = ?, id_vehiculo = ?, fecha_asignacion = ?, fecha_desasignacion = ? WHERE id_chofer_vehiculo = ? AND activo = 1';
        await queryMutation(sql, [id_chofer, id_vehiculo, fecha_asignacion, fecha_desasignacion, id], 'Chofer no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Chofer actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteChoferVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Choferes_Vehiculos SET activo = 0 WHERE id_chofer_vehiculo = ? AND activo = 1';
        await queryMutation(sql, [id], 'Chofer no encontrado o ya eliminado', 404);
        res.json({ message: 'Chofer eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllChoferesVehiculos,
    getChoferVehiculoById,
    createChoferVehiculo,
    updateChoferVehiculo,
    deleteChoferVehiculo
}

