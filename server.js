require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const incidentRoutes = require('./routes/incidents');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/incidents', incidentRoutes);

// Define port
const PORT = process.env.PORT || 3000;

// Basic route for testing API
app.get('/', (req, res) => {
    res.json({ message: 'HumanChain AI Safety Incident Log API is running' });
});

// Start server function
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

// Initialize server
startServer(); 