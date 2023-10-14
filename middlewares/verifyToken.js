require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Middleware para verificar y autenticar un token JWT.
 * Extrae el userId y el userRole del token y los añade al objeto req.
 */
module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(400).json({ error: 'Formato de token incorrecto' });
    }

    const token = bearer[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            let errMsg = 'Error al autenticar el token';
            if (err.name === 'TokenExpiredError') errMsg = 'Token expirado';
            else if (err.name === 'JsonWebTokenError') errMsg = 'Token inválido';
            return res.status(500).json({ error: errMsg, details: err.message });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};