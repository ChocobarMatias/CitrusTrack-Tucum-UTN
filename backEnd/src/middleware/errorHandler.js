/**
 * Middleware global para capturar y manejar errores
 * Procesa errores lanzados por los helpers de base de datos
 */

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Error interno del servidor' : undefined,
    message: statusCode !== 500 ? err.message : undefined
  });
};

module.exports = { errorHandler };
