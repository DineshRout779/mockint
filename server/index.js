const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const interviewRoutes = require('./routes/interview');
require('dotenv').config();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(cors());

const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

// routes
app.get('/api', (req, res) => {
  res.send('Happy hacking!');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interview', interviewRoutes);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
