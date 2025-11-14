const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllIndicadores = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Indicadores WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron indicadores activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getIndicadorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Indicadores WHERE id_indicador = ? AND activo = 1';
        const indicador = await queryOne(sql, [id], 'Indicador no encontrado');
        res.json(indicador);
    } catch (error) {
        next(error);
    }
}

const createIndicador = async (req, res, next) => {
    try {
        const { fecha_calculo, rupturas_frio, merma, puntualidad, costo_promedio } = req.body;
        const sql = 'INSERT INTO Indicadores (fecha_calculo, rupturas_frio, merma, puntualidad, costo_promedio, activo) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [fecha_calculo, rupturas_frio, merma, puntualidad, costo_promedio, 1]);
        res.status(201).json({ message: 'Indicador creado exitosamente', indicadorId: results.insertId });
    } catch (error) {
        next(error);
    }
}

const updateIndicador = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fecha_calculo, rupturas_frio, merma, puntualidad, costo_promedio } = req.body;
        const sql = 'UPDATE Indicadores SET fecha_calculo = ?, rupturas_frio = ?, merma = ?, puntualidad = ?, costo_promedio = ? WHERE id_indicador = ? AND activo = 1';
        await queryMutation(sql, [fecha_calculo, rupturas_frio, merma, puntualidad, costo_promedio, id], 'Indicador no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Indicador actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteIndicador = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Indicadores SET activo = 0 WHERE id_indicador = ? AND activo = 1';
        await queryMutation(sql, [id], 'Indicador no encontrado o ya eliminado', 404);
        res.json({ message: 'Indicador eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllIndicadores,
    getIndicadorById,
    createIndicador,
    updateIndicador,
    deleteIndicador
}