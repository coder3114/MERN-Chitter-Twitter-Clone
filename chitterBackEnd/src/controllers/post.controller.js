import { validationResult } from "express-validator";
import { postPeepService, getPeepsService } from "../services/posts.service.js";

export const postPeep = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: `Validation failed, please check input!` });
  }
  try {
    const peep = await postPeepService(req.body);
    res.status(201).json({ peep: peep, message: `Peep post successful` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPeeps = async (req, res) => {
  try {
    const peeps = await getPeepsService();
    // Sort into reverse chronological order
    peeps.sort((a, b) => {
      return b.time - a.time;
    });
    if (peeps.length === 0) {
      return res
        .status(404)
        .json({ message: `No peeps to display, start posting!` });
    }
    res.status(200).json(peeps);
  } catch (error) {
    res.status(400).json({ message: `Unable to retrieve peeps` });
  }
};
