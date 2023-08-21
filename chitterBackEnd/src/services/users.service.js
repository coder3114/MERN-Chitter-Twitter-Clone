import UserModel from "../models/UserModel.js";

export const registerUserService = async (user) => {
  try {
    const newUser = new UserModel(user);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};
