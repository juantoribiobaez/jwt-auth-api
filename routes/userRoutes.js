const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const authorization = require('../middlewares/authorization');

const router = express.Router();

// Rutas solo para usuarios
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/checkhealth', userController.checkHealth);
router.get('/logincheck', verifyToken, authorization('admin', 'user'), userController.getUserInfo);

// Rutas solo para administradores
router.get('/admin/users', verifyToken, authorization('admin'), adminController.getAllUsers); // get all users
router.put('/users/:id/username', verifyToken, authorization('admin'), adminController.updateUsername); // Update username
router.put('/users/password', verifyToken, authorization('admin'), adminController.updateUserPassword); // Update password
router.put('/admin/users/:id/role', verifyToken, authorization('admin'), adminController.updateUserRole); // Change role user
router.delete('/admin/users/:id', verifyToken, authorization('admin'), adminController.deleteUser); // Delete a User

module.exports = router;