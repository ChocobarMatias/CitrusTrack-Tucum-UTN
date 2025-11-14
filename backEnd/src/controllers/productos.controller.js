const { queryWithResults, queryOne, queryMutation } = require('../utils/db.helper');

const getAllProductos = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM Productos WHERE activo = 1';
        const results = await queryWithResults(sql, [], 'No se encontraron productos activos');
        res.json(results);
    } catch (error) {
        next(error)
    }
}

const getProductoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Productos WHERE id_producto = ? AND activo = 1';
        const producto = await queryOne(sql, [id], 'Producto no encontrado');
        res.json(producto);
    } catch (error) {
        next(error);
    }
}

const createProducto = async (req, res, next) => { 
    try {
        const { codigo, nombre, perfil_frio, fragilidad, maduracion, fecha_registro } = req.body;
        const sql = 'INSERT INTO Productos (codigo, nombre, perfil_frio, fragilidad, maduracion, fecha_registro, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const results = await queryMutation(sql, [codigo, nombre, perfil_frio, fragilidad, maduracion, fecha_registro, 1]);
        res.status(201).json({ message: 'Producto creado exitosamente', productoId: results.insertId });
    } catch (error) {
        next(error);
    }
 }

 const updateProducto = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { codigo, nombre, perfil_frio, fragilidad, maduracion, fecha_registro } = req.body;
        const sql = 'UPDATE Productos SET codigo = ?, nombre = ?, perfil_frio = ?, fragilidad = ?, maduracion = ?, fecha_registro = ? WHERE id_producto = ? AND activo = 1';
        await queryMutation(sql, [codigo, nombre, perfil_frio, fragilidad, maduracion, fecha_registro, id], 'Producto no encontrado o no se pudo actualizar', 404);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        next(error);
    }
  }

  const deleteProducto = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const sql = 'UPDATE Productos SET activo = 0 WHERE id_producto = ? AND activo = 1';
        await queryMutation(sql, [id], 'Producto no encontrado o ya eliminado', 404);
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}
