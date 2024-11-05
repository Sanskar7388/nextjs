const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    const db_link = process.env.MONGO_URI;
    mongoose.connect(db_link)
        .then(() => {
            console.log('db_connected');
            // insertDummyData(); // Insert dummy data after DB connection
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

// Initialize Express app
const app = express();
connectDB();

// Middleware
app.use(express.json());

// POST endpoint to create a new Test record
app.post('/api/tests', async (req, res) => {
    try {
        const newTest = new Test(req.body);
        console.log(newTest)
        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
