const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllClientes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Clientes WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron clientes activos');
        res.json(results);
    } catch (error) {
        next(error);
    }
}

const getClienteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Clientes WHERE id_cliente = ? AND activo = 1';
        const cliente = await queryOne(sql, [id], 'Cliente no encontrado');
        res.json(cliente);
    } catch (error) {
        next(error);
    }
};

const createCliente = async (req, res, next) => {
    try {
        const {nombre, direccion, lat, lng, contacto, telefono, fecha_alta} = req.body;
        const sql = 'INSERT INTO Clientes (nombre, direccion, lat, lng, contacto, telefono, fecha_alta, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [nombre, direccion, lat, lng, contacto, telefono, fecha_alta]);
        res.status(201).json({message: 'Cliente creado exitosamente', clienteId: results.insertId});
    } catch (error) {
        next(error);
    }
};

const updateCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, lat, lng, contacto, telefono, fecha_alta } = req.body;
        const sql = 'UPDATE Clientes SET nombre = ?, direccion = ?, lat = ?, lng = ?, contacto = ?, telefono = ?, fecha_alta = ? WHERE id_cliente = ? AND activo = 1';
        await queryMutation(sql, [nombre, direccion, lat, lng, contacto, telefono, fecha_alta, id], 'Cliente no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const deleteCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'UPDATE Clientes SET activo = 0 WHERE id_cliente = ? AND activo = 1';
        const results = await queryMutation(sql, [id], 'Cliente no encontrado o ya eliminado', 404);
        res.json({ message: 'Cliente eliminado exitosamente' }); 
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
}