const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllCajas = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Cajas WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron cajas activas');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getCajabyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Cajas WHERE id_caja = ? AND activo = 1';
        const caja = await queryOne(sql, [id], 'Caja no encontrada');
        res.json(caja);
    } catch (error) {
        next(error);
    }
}

const createCaja = async (req, res, next) => {
    try {
        const { id_lote, codigo_caja, peso, perfil_frio, estado, fecha_registro } = req.body;
        const sql = 'INSERT INTO Cajas (id_lote, codigo_caja, peso, perfil_frio, estado, fecha_registro, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [id_lote, codigo_caja, peso, perfil_frio, estado, fecha_registro, 1]);
        res.status(201).json({ message: 'Caja creada exitosamente', cajaId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateCaja = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_lote, codigo_caja, peso, perfil_frio, estado, fecha_registro } = req.body;
        const sql = 'UPDATE Cajas SET id_lote = ?, codigo_caja = ?, peso = ?, perfil_frio = ?, estado = ?, fecha_registro = ? WHERE id_caja = ? AND activo = 1';
        await queryMutation(sql, [id_lote, codigo_caja, peso, perfil_frio, estado, fecha_registro, id], 'Caja no encontrada o no se pudo actualizar', 404);
        res.json({ message: 'Caja actualizada exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteCaja = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Cajas SET activo = 0 WHERE id_caja = ? AND activo = 1';
        await queryMutation(sql, [id], 'Caja no encontrada o ya eliminada', 404);
        res.json({ message: 'Caja eliminada exitosamente' });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllCajas,
    getCajabyId,
    createCaja,
    updateCaja,
    deleteCaja
}