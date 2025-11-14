const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllAlertas = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Alertas WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron alertas activas');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getAlertasById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Alertas WHERE id_alerta = ? AND activo = 1';
        const alerta = await queryOne(sql, [id], 'Alerta no encontrada');
        res.json(alerta);
    } catch (error) {
        next(error);
    }
}

const createAlerta = async (req, res, next) => {
    try {
        const { id_caja, tipo, descripcion, nivel, fecha, atendida } = req.body;
        const sql = 'INSERT INTO Alertas (id_caja, tipo, descripcion, nivel, fecha, atendida, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [id_caja, tipo, descripcion, nivel, fecha, atendida, 1]);
        res.status(201).json({ message: 'Alerta creada exitosamente', alertaId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateAlerta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_caja, tipo, descripcion, nivel, fecha, atendida } = req.body;
        const sql = 'UPDATE Alertas SET id_caja = ?, tipo = ?, descripcion = ?, nivel = ?, fecha = ?, atendida = ? WHERE id_alerta = ? AND activo = 1';
        await queryMutation(sql, [id_caja, tipo, descripcion, nivel, fecha, atendida, id], 'Alerta no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Alerta actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteAlerta = async (req, res, next) => {
    try{
        const { id } = req.params;
        const sql = 'UPDATE Alertas SET activo = 0 WHERE id_alerta = ? AND activo = 1';
        await queryMutation(sql, [id], 'Alerta no encontrada o ya eliminada', 404);
        res.json({ message: 'Alerta eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAlertas,
    getAlertasById,
    createAlerta,
    updateAlerta,
    deleteAlerta
}