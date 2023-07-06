const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const todoRouter = require("./Routes/todo.routes");
const userRouter = require("./Routes/user.routes");

app.use("/todo", todoRouter);
app.use("/user", userRouter);

module.exports = app;
