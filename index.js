const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://todo:todo123@cluster0.vig1isr.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.put('/todos/:id', async (req, res) => {
  const { completed, text } = req.body;

  const updateData = {};
  if (completed !== undefined) updateData.completed = completed;
  if (text !== undefined) updateData.text = text;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


