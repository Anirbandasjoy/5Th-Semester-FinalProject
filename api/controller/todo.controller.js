const Todo = require("../models/todo.model");
const User = require("../models/user.models");

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

const newTodo = async (req, res) => {
  try {
    const { text, user } = req.body;

    console.log(user);
    const todo = new Todo({ text, user });
    // await User.updateOne(
    //   {
    //     _id: req.user._id,
    //   },
    //   {
    //     $push: {
    //       todos: todo._id, // Use todo._id to reference the newly created todo
    //     },
    //   }
    // );
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Todo.findByIdAndDelete(id);
    res.json({ result });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const todo = await Todo.findById(id);
    todo.text = text;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const complete = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error completing todo:", error);
    res.status(500).json({ error: "Failed to complete todo" });
  }
};

module.exports = { getAllTodo, newTodo, deleteTodo, updateTodo, complete };




