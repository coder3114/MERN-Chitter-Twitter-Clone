import { validationResult } from "express-validator";
import { registerUserService } from "../services/users.service.js";
import UserModel from "../models/UserModel.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: `Validation failed, please check input!` });
  }

  const { username, email } = req.body;

  // check Duplicate Username Or Email
  const existingUserWithUsername = await UserModel.findOne({
    username: username,
  });
  if (existingUserWithUsername) {
    return res.status(400).json({ message: `Username is already in use!` });
  }

  const existingUserWithEmail = await UserModel.findOne({
    email: email,
  });
  if (existingUserWithEmail) {
    return res.status(400).json({ message: `Email is already in use!` });
  }

  try {
    const user = await registerUserService(req.body);
    res
      .status(201)
      .json({ user: user, message: `User registration successful` });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: `Validation failed, please check input!` });
  }
};
