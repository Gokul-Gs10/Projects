const mongoose = require('mongoose');

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/fitnessDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the User schema with additional fields and validation
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username
    email: { type: String, required: true, unique: true },    // Email for user
    password: { type: String, required: true },               // Password for authentication
    age: { type: Number, required: true, min: 1 },            // Age (must be at least 1)
    height: { type: Number, required: true, min: 1 },         // Height in cm or inches
    weight: { type: Number, required: true, min: 1 },         // Weight in kg or lbs
    activityLevel: {
        type: String,
        required: true,
        enum: ['Low', 'Moderate', 'High'],                    // Expected activity levels
    },
    dietRecommendations: String,                              // Generated diet suggestions
    workoutRecommendations: String,                           // Generated workout suggestions
}, { timestamps: true });                                     // Automatically adds createdAt/updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model for use in other files
module.exports = User;
