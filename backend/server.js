require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const userDayRoutes = require('./routes/userDays');
app.use('/api/userdays', userDayRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend fonctionne bien ! 🎉' });
});
