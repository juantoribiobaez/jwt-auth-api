const { pool } = require('../config/dbConfig');

class AdminModel {
    /**
     * Obtiene todos los usuarios.
     * @returns {Array} Lista de usuarios.
     */
    static async getAllUsers() {
        const response = await pool.query('SELECT id, username, role FROM users');
        return response.rows;
    }

    /**
     * Actualiza el rol de un usuario.
     * @param {Number} userId - ID del usuario.
     * @param {String} newRole - Nuevo rol.
     * @returns {Object} Usuario actualizado.
     */
    static async updateUserRole(userId, newRole) {
        const response = await pool.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, role', [newRole, userId]);
        return response.rows[0];
    }

    /**
     * Actualiza la contraseña de un usuario.
     * @param {Number} userId - ID del usuario.
     * @param {String} hashedPassword - Contraseña cifrada.
     * @returns {Object} Usuario actualizado.
     */
    static async updatePassword(userId, hashedPassword) {
        const response = await pool.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username', [hashedPassword, userId]);
        return response.rows[0];
    }

    /**
     * Actualiza el nombre de usuario.
     * @param {Number} userId - ID del usuario.
     * @param {String} newUsername - Nuevo nombre de usuario.
     * @returns {Object} Usuario actualizado.
     */
    static async updateUsername(userId, newUsername) {
        const response = await pool.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, role', [newUsername, userId]);
        return response.rows[0];
    }
}

module.exports = AdminModel;