const { pool } = require('../config/db');

/**
 * Este helper fue creado para ejecutar una query y manejar automáticamente errores y validaciones comunes
 * Elimina la necesidad de repetir código de validación en cada controlador
 * 
 * 1. queryWithResults: Ejecuta una query y valida que existan resultados, lanzando error 404 si no los hay
 * 2. queryOne: Ejecuta una query y retorna el primer resultado, lanzando error 404 si no existe
 * 3. queryMutation: Ejecuta INSERT, UPDATE o DELETE y valida que se hayan afectado filas, lanzando error 404 o 400 si no es así
 * 
 */


const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error('Error en la base de datos:', err);
        const error = new Error('Error interno del servidor');
        error.status = 500;
        return reject(error);
      }
      resolve(results);
    });
  });
};


const queryWithResults = async (sql, params = [], errorMessage = 'No se encontraron resultados') => {
  const results = await query(sql, params);
  
  if (results.length === 0) {
    const error = new Error(errorMessage);
    error.status = 404;
    throw error;
  }
  
  return results;
};


const queryOne = async (sql, params = [], errorMessage = 'Registro no encontrado') => {
  const results = await queryWithResults(sql, params, errorMessage);
  return results[0];
};


const queryMutation = async (sql, params = [], errorMessage = 'No se pudo realizar la operación', statusCode = 400) => {
  const results = await query(sql, params);
  
  if (results.affectedRows === 0) {
    const error = new Error(errorMessage);
    error.status = statusCode;
    throw error;
  }
  
  return results;
};

module.exports = {
  query,
  queryWithResults,
  queryOne,
  queryMutation
};
