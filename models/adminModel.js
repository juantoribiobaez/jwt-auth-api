const { pool } = require('../config/dbConfig');

class AdminModel {
    /**
     * Obtiene todos los usuarios.
     * @returns {Array} Lista de usuarios.
     */
    static async getAllUsers(limit = 10, offset = 0) {
        const response = await pool.query('SELECT id, username, role FROM users LIMIT $1 OFFSET $2', [limit, offset]);
        return response.rows;
    }

    /**
     * Verifica si un nombre de usuario ya existe en la base de datos.
     * @param {String} username - Nombre de usuario a verificar.
     * @returns {Boolean} Verdadero si el nombre de usuario ya existe, falso en caso contrario.
     */
    static async usernameExists(username) {
        const response = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
        return response.rows.length > 0;
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
     * @returns {Object} Usuario actualizado o error si el nombre de usuario ya está en uso.
     */
    static async updateUsername(userId, newUsername) {
        // Verificar si el nombre de usuario ya existe
        const exists = await AdminModel.usernameExists(newUsername);
        if (exists) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const response = await pool.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, role', [newUsername, userId]);
        return response.rows[0];
    }

    /**
     * Elimina un usuario.
     * @param {Number} userId - ID del usuario.
     * @returns {Boolean} Verdadero si el usuario fue eliminado, falso en caso contrario.
     */
    static async deleteUser(userId) {
        const response = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
        return response.rowCount > 0;
    }
}

module.exports = AdminModel;
