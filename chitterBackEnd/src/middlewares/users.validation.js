import { check } from "express-validator";

export const newUserValidation = [
  check("firstName").exists(),
  check("lastName").exists(),
  check("username").exists(),
  check("email").exists().normalizeEmail().escape().isEmail(),
  check("password").exists(),
];

export const userValidation = [
  check("email").exists(),
  check("password").exists(),
];
