const bcrypt = require('bcrypt');
const { pool } = require('../config/dbConfig');

class UserModel {
    /**
     * Crea un nuevo usuario.
     * @param {String} username - Nombre de usuario.
     * @param {String} password - Contraseña.
     * @returns {Object} Usuario creado.
     */
    static async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        return response.rows[0];
    }

    /**
     * Obtiene un usuario por nombre de usuario.
     * @param {String} username - Nombre de usuario.
     * @returns {Object} Usuario encontrado.
     */
    static async getUserByUsername(username) {
        const response = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return response.rows[0];
    }

    /**
     * Obtiene el nombre de usuario por ID.
     * @param {Number} userId - ID del usuario.
     * @returns {Object} Nombre de usuario.
     */
    static async getUsernameById(userId) {
        const response = await pool.query('SELECT username, role FROM users WHERE id = $1', [userId]);
        return response.rows[0];
    }

    /**
     * Verifica la salud de la conexión a la base de datos.
     * @returns {Boolean} Verdadero si la conexión es exitosa, falso en caso contrario.
     */
    static async checkHealth() {
        try {
            await pool.query('SELECT 1');
            return true;
        } catch {
            return false;
        }
    }

    static async getUserById(userId) {
        const response = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [userId]);
        return response.rows[0];
    }
    
}

module.exports = UserModel;