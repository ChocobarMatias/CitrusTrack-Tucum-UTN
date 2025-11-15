const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllViajes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Viajes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron viajes activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getViajesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Viajes WHERE id_viaje = ? AND activo = 1';
        const viaje = await queryOne(sql, [id], 'Viaje no encontrado');
        res.json(viaje);
    } catch (error) {
        next(error);
    }
}

const createViaje = async (req, res, next) => {
    try {
        const { id_chofer, id_vehiculo, origen, destino, fecha_inicio, fecha_fin, costo_estimado, co2_estimado, lat_actual, lng_actual, eta_estimada, combustible_estimado } = req.body;
        const sql = 'INSERT INTO Viajes (id_chofer, id_vehiculo, origen, destino, fecha_inicio, fecha_fin, costo_estimado, co2_estimado, lat_actual, lng_actual, eta_estimada, combustible_estimado, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [id_chofer, id_vehiculo, origen, destino, fecha_inicio, fecha_fin, costo_estimado, co2_estimado, lat_actual, lng_actual, eta_estimada, combustible_estimado, 1], 'No se pudo crear el viaje');
        res.status(201).json({ message: 'Viaje creado exitosamente', viajeId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateViaje = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_chofer, id_vehiculo, origen, destino, fecha_inicio, fecha_fin, costo_estimado, co2_estimado, lat_actual, lng_actual, eta_estimada, combustible_estimado } = req.body;
        const sql = 'UPDATE Viajes SET id_chofer = ?, id_vehiculo = ?, origen = ?, destino = ?, fecha_inicio = ?, fecha_fin = ?, costo_estimado = ?, co2_estimado = ?, lat_actual = ?, lng_actual = ?, eta_estimada = ?, combustible_estimado = ? WHERE id_viaje = ? AND activo = 1';
        await queryMutation(sql, [id_chofer, id_vehiculo, origen, destino, fecha_inicio, fecha_fin, costo_estimado, co2_estimado, lat_actual, lng_actual, eta_estimada, combustible_estimado, id], 'Viaje no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Viaje actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteViaje = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Viajes SET activo = 0 WHERE id_viaje = ? AND activo = 1';
        await queryMutation(sql, [id], 'Viaje no encontrado o ya eliminado', 404);
        res.json({ message: 'Viaje eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllViajes,
    getViajesById,
    createViaje,
    updateViaje,
    deleteViaje
}