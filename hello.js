const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    const db_link = process.env.MONGO_URI;
    mongoose.connect(db_link)
        .then(() => {
            console.log('db_connected');
        })
        .catch(err => console.log(err));
};

// Define the Mongoose schema
const testSchema = new mongoose.Schema({
    Test_id: { type: String },
    Device_id: { type: String },
    OR: { type: Number },
    ISS: { type: Number },
    Concentration: { type: Number },
    Brix: { type: Number },
    Pol: { type: Number },
    Purity: { type: Number},
    SR: { type: Number},
    Longitude: { type: Number },
    Latitude: { type: Number },
    Temp_surronding: { type: Number },
    Temp_solution: { type: Number },
    Date_Time: { type: Date },
});

const Test = mongoose.model('Test', testSchema);

// Initialize DB connection
connectDB();

// POST endpoint to create a new Test record
app.post('/api/tests', async (req, res) => {
    console.log('Incoming data:', req.body); // Check the incoming data

    try {
        const newTest = new Test(req.body);
        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
        console.error('Error saving test data:', error); // Log the error for debugging
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to retrieve all Test records
app.get('/api/tests', async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
