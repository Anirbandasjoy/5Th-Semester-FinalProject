const {
  createUser,
  loginUser,
  getAllUser,
  getProfile,
} = require("../controller/user.controller");
const {
  userValidation,
  userLoginValidation,
} = require("../userValidation/User.validation");

const userRouter = require("express").Router();

userRouter.get("/", getAllUser);
userRouter.post("/register", userValidation, createUser);
userRouter.post("/login", userLoginValidation, loginUser);
userRouter.get("/profile", getProfile);

module.exports = userRouter;
