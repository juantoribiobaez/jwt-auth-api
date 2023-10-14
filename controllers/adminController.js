const AdminModel = require('../models/adminModel');
/**
 * Obtiene y devuelve todos los usuarios.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Lista de usuarios.
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await AdminModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', detalles: error.message });
    }
};

/**
 * Actualiza el rol de un usuario específico.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Usuario actualizado o mensaje de error.
 */
exports.updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body; // Nuevo rol desde el cuerpo de la solicitud

        // Validación del rol
        const allowedRoles = ['admin', 'user', 'editor']; // Ajusta según tus roles.
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: 'Rol no válido' });
        }

        const updatedUser = await AdminModel.updateUserRole(userId, role);

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el rol del usuario', detalles: error.message });
    }
};

/**
 * Actualiza la contraseña de un usuario.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Mensaje de éxito o error.
 */
exports.updateUserPassword = async (req, res) => {
    try {
        const userId = req.userId; // Asumiendo que tienes el ID del usuario en el token
        const { currentPassword, newPassword } = req.body;

        // Obtener el usuario por ID
        const user = await UserModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }

        // Hashing de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Actualizar la contraseña en la base de datos
        await AdminModel.updatePassword(userId, hashedPassword);
        
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña', detalles: error.message });
    }
};

/**
 * Actualiza el nombre de usuario.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Usuario actualizado o mensaje de error.
 */
exports.updateUsername = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username } = req.body; // Nuevo nombre de usuario desde el cuerpo de la solicitud

        // Actualizar el nombre de usuario en la base de datos
        const updatedUser = await AdminModel.updateUsername(userId, username);
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el nombre de usuario', detalles: error.message });
    }
};
