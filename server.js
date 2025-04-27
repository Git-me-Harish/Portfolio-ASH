// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message'); // Import the model

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
const MONGODB_URI = process.env.MONGODB_URI;

// --- Middleware ---
// Enable CORS for all origins (adjust for production)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies (for standard form submissions)
app.use(express.urlencoded({ extended: true }));

// --- Database Connection ---
if (!MONGODB_URI) {
    console.error("💥 Error: MONGODB_URI is not defined in the .env file.");
    process.exit(1); // Exit if DB connection string is missing
}

mongoose.connect(MONGODB_URI, {
    // Options to avoid deprecation warnings (check Mongoose docs for latest)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Might not be needed in newer Mongoose versions
    // useFindAndModify: false // Might not be needed in newer Mongoose versions
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => {
    console.error("💥 MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails on startup
});


// --- API Routes ---

// Basic route for testing if the server is running
app.get('/', (req, res) => {
    res.send('Portfolio Contact API is running!');
});

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    console.log('Received contact form submission:', req.body); // Log received data

    // 1. Extract data from request body
    const { name, email, subject, message } = req.body;

    // 2. Basic Server-Side Validation
    if (!name || !email || !message) {
        console.log("Validation failed: Missing required fields.");
        return res.status(400).json({ message: 'Please provide name, email, and message.' });
    }

    // (Email format validation is handled by Mongoose schema)

    try {
        // 3. Create a new message instance using the Mongoose model
        const newMessage = new Message({
            name,
            email,
            subject: subject || 'No Subject Provided', // Handle optional subject
            message
        });

        // 4. Save the message to the database
        const savedMessage = await newMessage.save();
        console.log('Message saved successfully:', savedMessage._id);

        // 5. Send success response back to the client
        res.status(201).json({ // 201 Created status
            message: 'Message received successfully! Thank you for reaching out.',
            messageId: savedMessage._id // Optionally send back the ID
        });

    } catch (error) {
        console.error("💥 Error saving message:", error);

        // Handle Mongoose validation errors specifically
        if (error.name === 'ValidationError') {
            // Extract validation messages
            const errors = Object.values(error.errors).map(el => el.message);
            return res.status(400).json({
                message: 'Validation failed. Please check your input.',
                errors: errors
            });
        }

        // Handle other potential errors (e.g., database connection issue during save)
        res.status(500).json({
            message: 'An error occurred while processing your message. Please try again later.',
            // error: error.message // Avoid sending detailed internal errors to the client in production
        });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});