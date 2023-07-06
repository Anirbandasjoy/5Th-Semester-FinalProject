const express = require("express");
const {
  getAllTodo,
  newTodo,
  deleteTodo,
  complete,
  updateTodo,
} = require("../controller/todo.controller");

const todoRouter = express.Router();

todoRouter.get("/", getAllTodo);
todoRouter.get("/complete/:id", complete);
todoRouter.post("/new", newTodo);
todoRouter.delete("/delete/:id", deleteTodo);
todoRouter.put("/complete/:id", updateTodo);

module.exports = todoRouter;
