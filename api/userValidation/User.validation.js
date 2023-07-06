const { body, validationResult } = require("express-validator");

const userValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("min Length 3 char")
    .isLength({ max: 20 })
    .withMessage("max Length 20"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").trim().notEmpty().withMessage("password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation passed, continue to the next middleware
    next();
  },
];
const userLoginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("please password 6 char"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation passed, continue to the next middleware
    next();
  },
];

module.exports = { userValidation, userLoginValidation };
