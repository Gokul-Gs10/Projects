const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./db'); // Ensure db.js is set up correctly (User model for storing user data and recommendations)
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitlife360', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Tracker Schema
const trackerSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    exercise: String,
    duration: String,
    exerciseCalories: String,
    meal: String,
    caloriesIntake: String,
    macros: String,
    mealCategory: String,
    water: String,
    sleepHours: String,
    sleepQuality: String,
    dietPlan: String, // Fetched diet plan
});

const Tracker = mongoose.model('Tracker', trackerSchema);

// User Schema for Authentication (Username and Password only)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const AuthUser = mongoose.model('AuthUser', userSchema);

// Register API
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await AuthUser.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Save new user to the database
        const newUser = new AuthUser({ username, password }); // Add password hashing for production!
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', user: { username } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});
const healthDataSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    exercise: String,
    duration: String,
    exerciseCalories: String,
    meal: String,
    caloriesIntake: String,
    macros: String,
    mealCategory: String,
    water: String,
    sleepHours: String,
    sleepQuality: String,
    dietPlan: String, // Fetched diet plan
});

// Connect to the 'health_data' collection in 'fitnessDB' database
const HealthData = mongoose.model('HealthData', healthDataSchema, 'health_data');

// API to fetch data from health_data collection
app.get('/api/health-data', async (req, res) => {
    try {
        // Optional query parameters for filtering
        const filters = req.query;

        // Fetch data from the health_data collection
        const data = await HealthData.find(filters); // Pass filters to the query
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching health data:', error);
        res.status(500).json({ error: 'Error fetching health data' });
    }
});


// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await AuthUser.findOne({ username });
        if (!user || user.password !== password) { // Add proper password comparison (e.g., bcrypt) for production!
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Mock token generation for authentication
        const token = `mock-token-for-${user.username}`; // Replace with real JWT generation in production

        res.json({ message: 'Login successful!', token, user: { username } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error during login' });
    }
});

// Profile Data
let userProfile = {
    username: "JohnDoe",
    avatarUrl: "default-avatar.png",
    achievements: 5,
    currentStreak: 7,
    badges: ["badge1.png", "badge2.png"],
};

// Profile API to fetch profile details
app.get("/api/profile", (req, res) => {
    res.json(userProfile);
});

// Profile API to update profile details
app.post("/api/profile", (req, res) => {
    const { username, avatarUrl, achievements, currentStreak, badges } = req.body;
    userProfile = { username, avatarUrl, achievements, currentStreak, badges };
    res.json({ message: "Profile updated successfully!", userProfile });
});

// Tracker APIs

// API to log tracker data (exercise, calories, etc.)
app.post('/api/log', async (req, res) => {
    try {
        const data = new Tracker(req.body);
        await data.save();
        res.status(201).send(data);
    } catch (error) {
        console.error('Error saving tracker data:', error);
        res.status(500).send({ error: 'Error saving tracker data' });
    }
});


// Mock Diet Plan API (fetches a sample diet plan)
app.get('/api/diet', async (req, res) => {
    try {
        // Mock diet plan (replace with dynamic logic if necessary)
        const dietPlan = {
            meal: 'Grilled Chicken Salad',
            dietPlan: 'High Protein, Low Carb',
        };
        res.json(dietPlan);
    } catch (error) {
        console.error('Error fetching diet plan:', error);
        res.status(500).send({ error: 'Error fetching diet plan' });
    }
});

// Recommendation API to generate and store user recommendations (diet and workout)
app.get('/api/recommendation', async (req, res) => {
    try {
        // Fetch all logged data
        const data = await Tracker.find();

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No logged data found' });
        }

        // Sort data by date and get the latest record
        const latestRecord = data.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        // Fetch the recommended plans
        console.log(latestRecord);
        const recommendation = await getRecommendationFromDB(latestRecord);
        console.log(Object.keys(recommendation));
        const dietPlan = recommendation._doc['Diet Plan'];
        const vegMealPlan = recommendation._doc['Vegetarian Meal Suggestion'];
        const nonVegMealPlan = recommendation._doc['Non-Vegetarian Meal Suggestion'];
        // Determine which meal plan to return based on the latest record's meal category
        const mealPlan =
            latestRecord.mealCategory === 'veg' ? vegMealPlan : nonVegMealPlan;

        // Respond with the Diet Plan and the appropriate Meal Plan
        console.log(dietPlan);
        console.log(mealPlan);
        return res.json({
            dietPlan,
            mealPlan,
        });
    } catch (error) {
        console.error('Error in recommendation API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to log tracker data (exercise, calories, etc.)
app.post('/api/log-data', async (req, res) => {
    try {
        const healthData = req.body;  // Health data from the client (exercise, calories, sleep, etc.)
        const data = new Tracker(healthData);  // Create new Tracker entry
        await data.save();  // Save to the database
        res.status(201).json(data);  // Return the saved data
    } catch (error) {
        console.error('Error saving tracker data:', error);
        res.status(500).json({ error: 'Error saving tracker data' });  // Handle errors
    }
});

// API to fetch logged health data for progress tracking (exercise, meal, water intake, etc.)
app.get('/api/data', async (req, res) => {
    try {
        const data = await Tracker.find();  // Fetch all tracker entries from the database
        res.json(data);  // Return the data as JSON
    } catch (error) {
        console.error('Error fetching tracker data:', error);
        res.status(500).json({ error: 'Error fetching tracker data' });  // Handle errors
    }
});

// Fetch user progress data, could be used for charts
app.get('/api/progress', async (req, res) => {
    try {
        const data = await Tracker.find();  // Fetch all health data entries
        const progress = data.map(item => ({
            date: item.date.toISOString().split('T')[0],  // Format the date
            exerciseCalories: item.caloriesBurned || 0,  // Calories burned during exercise
            caloriesIntake: item.caloriesIntake || 0,  // Calories consumed via meals
            water: item.waterIntake || 0,  // Water intake in liters
        }));
        res.json(progress);  // Return progress data in a simplified format
    } catch (error) {
        console.error('Error fetching progress data:', error);
        res.status(500).json({ error: 'Error fetching progress data' });  // Handle errors
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const getRecommendationFromDB = async (userData) => {
    const { exercise, duration, exerciseCalories, meal, caloriesIntake, macros, mealCategory, water, sleepHours, sleepQuality, _id, date } = userData;

    // Query the health_data collection for matching records
    const recommendation = await HealthData.findOne({
        "Exercise Type": exercise,
        "Meal Type":meal
    },
    {'Diet Plan':1, "Vegetarian Meal Suggestion":1, "Non-Vegetarian Meal Suggestion":1});
    console.log(recommendation)
    return recommendation;
};
