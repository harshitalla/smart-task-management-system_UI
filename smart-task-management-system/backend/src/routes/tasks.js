const express = require('express');
const pool = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    let sql = `
      SELECT
        t.id,
        t.title,
        t.description,
        t.priority,
        t.status,
        t.deadline,
        t.assigned_to,
        u.name AS assigned_user
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
    `;

    const params = [];

    if (req.user.role !== 'admin') {
      sql += ' WHERE t.assigned_to = ?';
      params.push(req.user.id);
    }

    sql += ' ORDER BY t.created_at DESC';

    const [tasks] = await pool.execute(sql, params);
    res.json(tasks);
  } catch {
    res.status(500).json({ message: 'Failed to load tasks' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      deadline,
      assigned_to
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const assignedUser = assigned_to || req.user.id;

    const [result] = await pool.execute(
      `INSERT INTO tasks
      (title, description, priority, deadline, assigned_to, created_by)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
        priority || 'Medium',
        deadline || null,
        assignedUser,
        req.user.id
      ]
    );

    res.status(201).json({
      message: 'Task created',
      id: result.insertId
    });
  } catch {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, priority, status, deadline } = req.body;

    let sql = `
      UPDATE tasks
      SET title = ?, description = ?, priority = ?, status = ?, deadline = ?
      WHERE id = ?
    `;

    const params = [
      title,
      description || '',
      priority,
      status,
      deadline || null,
      req.params.id
    ];

    if (req.user.role !== 'admin') {
      sql += ' AND assigned_to = ?';
      params.push(req.user.id);
    }

    const [result] = await pool.execute(sql, params);

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated' });
  } catch {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let sql = 'DELETE FROM tasks WHERE id = ?';
    const params = [req.params.id];

    if (req.user.role !== 'admin') {
      sql += ' AND assigned_to = ?';
      params.push(req.user.id);
    }

    const [result] = await pool.execute(sql, params);

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
