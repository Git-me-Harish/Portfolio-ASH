// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true // Removes leading/trailing whitespace
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true, // Store email in lowercase
        match: [ // Basic email format validation
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    subject: {
        type: String,
        trim: true,
        default: 'No Subject' // Optional: provide a default
    },
    message: {
        type: String,
        required: [true, 'Message body is required'],
        trim: true
    },
    receivedAt: {
        type: Date,
        default: Date.now // Automatically set the date when saved
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Create and export the model
const Message = mongoose.model('Message', messageSchema); // 'Message' will create a 'messages' collection in MongoDB

module.exports = Message;