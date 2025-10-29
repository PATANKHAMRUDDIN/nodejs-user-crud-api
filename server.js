const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import your routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API!');
});

// Use the user routes
// All routes in userRoutes.js will be prefixed with /users
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});