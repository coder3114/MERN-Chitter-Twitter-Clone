import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: `Validation failed, please check input!` });
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
