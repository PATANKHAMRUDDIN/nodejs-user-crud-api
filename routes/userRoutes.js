const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the CRUD endpoints

// GET /users - Get all users
router.get('/', userController.getUsers);

// POST /users - Create a new user
router.post('/', userController.createUser);

// PUT /users/:id - Update a user by ID
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;