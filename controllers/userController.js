const fs = require('fs').promises; // Use an async version of 'fs'
const path = require('path');
const crypto = require('crypto'); // Built-in module for generating IDs

// Path to your JSON data file
const usersDbPath = path.join(__dirname, '..', 'data', 'users.json');

// --- Helper Functions ---

// Helper function to read the data
const readData = async () => {
  try {
    const data = await fs.readFile(usersDbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or is empty, return empty array
    if (err.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading data file:', err);
    throw new Error('Could not read data');
  }
};

// Helper function to write data
const writeData = async (data) => {
  try {
    await fs.writeFile(usersDbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing data file:', err);
    throw new Error('Could not write data');
  }
};

// --- Controller Functions ---

// GET /users - Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await readData();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};

// POST /users - Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Basic Validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const users = await readData();
    const newUser = {
      id: crypto.randomUUID(), // Generate a unique ID
      name,
      email,
    };

    users.push(newUser);
    await writeData(users);

    res.status(201).json(newUser); // 201 Created
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// PUT /users/:id - Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const users = await readData();

    const userIndex = users.findIndex((user) => user.id === id);

    // Check if user exists
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user (only fields that are provided)
    const updatedUser = { ...users[userIndex] }; // Copy existing user
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;

    users[userIndex] = updatedUser;
    await writeData(users);

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// DELETE /users/:id - Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readData();

    const filteredUsers = users.filter((user) => user.id !== id);

    // Check if a user was actually deleted
    if (users.length === filteredUsers.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    await writeData(filteredUsers);

    res.status(200).json({ message: 'User deleted successfully' });
    // You can also use status(204) (No Content), but it won't send a JSON body
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};