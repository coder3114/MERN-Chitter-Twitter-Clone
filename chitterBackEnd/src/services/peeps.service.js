import Peep from "../models/Peep.js";

export const postPeepService = async (peep) => {
  try {
    const newPeep = new Peep(newPeepData);
    return await newPeep.save();
  } catch (e) {
    throw e;
  }
};
