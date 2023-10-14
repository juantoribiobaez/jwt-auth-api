/**
 * Middleware de autorización para verificar el rol del usuario.
 * @param {...String} roles - Rol(es) permitido(s) para acceder al recurso.
 * @returns {Function} Middleware de Express.
 */
module.exports = (...roles) => {
    return (req, res, next) => {
        if (req.userRole && roles.includes(req.userRole)) {
            next(); // el usuario tiene uno de los roles permitidos, pasa al siguiente middleware
        } else {
            res.status(403).json({ error: `Acceso no autorizado. Se requiere uno de los siguientes roles: ${roles.join(', ')}` });
        }
    };
};