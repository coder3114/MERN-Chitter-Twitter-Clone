import PeepModel from "../models/PeepModel.js";

export const postPeepService = async (peep) => {
  try {
    const newPeep = new PeepModel(peep);
    return await newPeep.save();
  } catch (error) {
    throw error;
  }
};

export const getPeepsService = async () => {
  try {
    return await PeepModel.find({}).populate("userId", [
      "firstName",
      "lastName",
      "username",
    ]);
  } catch (error) {
    throw error;
  }
};
