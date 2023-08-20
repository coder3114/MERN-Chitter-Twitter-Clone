import UserModel from "../models/UserModel.js";

export const findUserService = async (field) => {
  try {
    return await UserModel.findOne({
      field: field,
    });
  } catch (error) {
    throw error;
  }
};

export const registerUserService = async (user) => {
  try {
    const newUser = new UserModel(user);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};
