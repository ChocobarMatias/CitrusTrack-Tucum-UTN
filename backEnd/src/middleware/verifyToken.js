const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => { 

    const autoheader = req.headers['authorization']; 

    if(!secretKey){
        return res.status(500).json({message: 'Clave secreta no configurada en el servidor'});
    }

    if(!autoheader){
        return res.status(401).json({message: 'Acceso denegado. No se proporcionó token.'});
    }

    //[encabezado, token]
    const tokenParts = autoheader.split(' '); // divide el encabezado en partes

    if(tokenParts[0] !== 'Bearer' || !tokenParts[1]){
        return res.status(401).json({message: 'Acceso denegado. Formato de token inválido.'});
    }

    const token = tokenParts[1]; 

    jwt.verify(token, secretKey, (err, decoded) => { 
        if(err){

          if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({message: 'Acceso denegado. Token inválido o expirado.'});
        }
            return res.status(500).json({message: 'Error al verificar el token.'});
        }   
        req.user = decoded; 
        next(); 
    });
}

module.exports = {verifyToken};