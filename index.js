const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo'); // make sure this path is correct

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://todo:todo123@cluster0.vig1isr.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


// ✅ Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  console.log("Request Body:", req.body); // 👈 Add this
  const newTodo = new Todo({
    text: req.body.text
  });
  await newTodo.save();
  res.json(newTodo);
});


app.put('/todos/:id', async (req, res) => {
  const { completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.put('/todos/:id', async (req, res) => {
  const { completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed },
    { new: true }
  );
  res.json(updatedTodo);
});
