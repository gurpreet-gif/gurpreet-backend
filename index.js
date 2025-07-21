const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://gurpreet-gif.github.io'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Portfolio Website API');
});

// Routes
const uploadRoutes = require('./routes/upload');
const aboutRoutes = require('./routes/about');
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/project');
const reviewRoutes = require('./routes/review');

app.use('/api/upload', uploadRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
