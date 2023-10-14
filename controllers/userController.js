const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Registra un nuevo usuario.
 */
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const user = await UserModel.createUser(username, password);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario', detalles: error.message });
    }
};

/**
 * Autentica un usuario y devuelve un token.
 */
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.getUserByUsername(username);
        
        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
                    expiresIn: 86400 // 24 horas
                });
                res.json({ auth: true, token });
            } else {
                res.status(401).json({ auth: false, mensaje: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ auth: false, mensaje: 'El usuario no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al autenticar el usuario', detalles: error.message });
    }
};

/**
 * Obtiene la información del usuario actual.
 */
exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.getUsernameById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario', detalles: error.message });
    }
};

/**
 * Verifica la conexión con la base de datos.
 */
exports.checkHealth = async (req, res) => {
    try {
        await UserModel.checkHealth();
        res.json({ status: 'Conexión exitosa' });
    } catch (error) {
        res.status(500).json({ error: 'Error de conexión', detalles: error.message });
    }
};