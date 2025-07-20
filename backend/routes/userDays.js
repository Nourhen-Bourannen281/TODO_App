const express = require('express');
const router = express.Router();
const UserDay = require('../models/userDay');
const verifyToken = require('../middleware/authMiddleware');

// GET données d’un jour
router.get('/:dayNumber', verifyToken, async (req, res) => {
  const userId = req.userId;
  const dayNumber = parseInt(req.params.dayNumber, 10);

  let userDay = await UserDay.findOne({ userId, dayNumber });

  if (!userDay) {
    return res.json({ tasks: [], completed: [], title: "", quote: "" });
  }

  res.json({
    tasks: userDay.tasks,
    completed: userDay.completed,
    title: userDay.title || "",
    quote: userDay.quote || ""
  });
});

// POST pour créer/mettre à jour
router.post('/update', verifyToken, async (req, res) => {
  const { dayNumber, tasks, completed, title, quote } = req.body;
  const userId = req.userId;

  let userDay = await UserDay.findOne({ userId, dayNumber });

  if (userDay) {
    userDay.tasks = tasks;
    userDay.completed = completed;
    userDay.title = title || userDay.title;
    userDay.quote = quote || userDay.quote;
    await userDay.save();
  } else {
    await UserDay.create({ userId, dayNumber, tasks, completed, title, quote });
  }

  res.json({ message: 'Données mises à jour' });
});

module.exports = router;
