const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Store
let tasks = [
    { id: '1', title: 'Learn React', description: 'Study Hooks and Context API', status: 'todo' },
    { id: '2', title: 'Build Backend', description: 'Setup Express and API endpoints', status: 'done' }
];

// Routes

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: Date.now().toString(),
        title,
        description: description || '',
        status: status || 'todo'
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        title: title !== undefined ? title : tasks[taskIndex].title,
        description: description !== undefined ? description : tasks[taskIndex].description,
        status: status !== undefined ? status : tasks[taskIndex].status
    };

    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
