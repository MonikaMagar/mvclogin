const User = require('../models/user');
const bcrypt = require('bcryptjs'); // For password hashing and comparison

// Get all users (for testing or admin use)
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Save the hashed password
        });

        // Respond with success and user details (excluding password)
        res.status(201).json({
            message: 'Registration successful🥳',
           
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Wrong email or user not found' });
        }

        // Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        // Respond with success message or a JWT token
        res.status(200).json({ message: 'Login successful 🥳' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
