import validationResult from "express-validator";
import { postPeepService } from "../services/peeps.service.js";

export const postPeepController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(`Posting new peep failed`);
  }
  try {
    const peep = await postPeepService(req.body);
    res.status(201).json({ peep });
  } catch (error) {
    console.log(error);
    res.status(400).send(`Posting new peep failed`);
  }
};
