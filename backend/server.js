const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS package
const connect = require('./config/db');  
const userRoutes = require('./routes/userRoutes');

const app = express();

// Load environment variables
dotenv.config();

// Enable CORS for all routes
app.use(cors());  // This will enable CORS for all incoming requests

app.use(express.json());  // Middleware to parse incoming JSON data

// Routes
app.use('/api/v1', userRoutes);

// Define the port (from environment or default to 5000)
const port = process.env.PORT || 5000;

// Connect to the database
connect();

// Start the server
app.listen(port, () => {
    console.log(`We are running on port ${port}`);
});
