require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logError');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// routes
app.use('/wallet', require('./routes/wallet'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});