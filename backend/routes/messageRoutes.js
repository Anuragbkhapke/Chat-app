// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all messages
router.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new message
router.post('/messages', (req, res) => {
  const { content } = req.body;
  db.query('INSERT INTO messages (content) VALUES (?)', [content], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, content });
  });
});

// Update a message
router.put('/messages/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  db.query('UPDATE messages SET content = ? WHERE id = ?', [content, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Delete a message
router.delete('/messages/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM messages WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

module.exports = router;
