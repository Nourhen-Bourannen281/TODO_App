const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Nom déjà utilisé" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.json({ message: 'Utilisateur créé' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // 👈 utilise username, pas email
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
