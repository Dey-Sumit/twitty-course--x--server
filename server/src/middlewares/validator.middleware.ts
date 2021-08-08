import { check, validationResult } from "express-validator";

export const signupValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is Required")
    .isLength({ min: 5 })
    .withMessage("Username length must be at least 4")
    .matches(/^\w+$/)
    .withMessage("no special characters are allowed for username"),
  check("name").not().isEmpty().withMessage("Name is Required"),
  check("email")
    .notEmpty()
    .withMessage("Name is Required")
    .isEmail()
    .withMessage("Email is not valid"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password Length must be at least 6"),
];

export const validationFormatter = validationResult.withDefaults({
  formatter: (error) => {
    return {
      message: error.msg,
    };
  },
});
