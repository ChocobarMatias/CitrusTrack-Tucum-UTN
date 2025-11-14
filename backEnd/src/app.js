//Configuracion del servidor y middlewares
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');


const app = express();

app.use(cors());// Middleware para habilitar CORS para todas las rutas y navegadores 
app.use(morgan('dev'));// Middleware para registrar solicitudes HTTP
app.use(bodyParser.json());// Middleware para parsear cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));// Middleware para parsear cuerpos JSON y URL-encoded
app.use(express.json());
app.use(helmet());// Middleware de seguridad

// Rutas
app.use('/api', router);


// Middleware de manejo de errores
// debe ir al final para capturar errores de todas las rutas
app.use(errorHandler);


module.exports = app;