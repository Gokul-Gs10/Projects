const express = require('express');
const mongoose = require('mongoose');
const User = require('./db'); // Import User model from db.js
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve homepage
});

app.post('/log-data', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(200).json({ message: "Data logged successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving data." });
    }
});

// Database Connection
mongoose.connect('mongodb://localhost:27017/fitnessDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
