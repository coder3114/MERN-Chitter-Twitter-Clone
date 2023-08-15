import validationResult from "express-validator";
import PeepModel from "../models/PeepModel.js";

export const postPeep = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).send(`Posting new peep failed`);
  // }
  const newPeep = new PeepModel(req.body);
  try {
    await newPeep.save();
    res.status(201).json(newPeep);
  } catch (error) {
    res.status(500).json(error);
    // res.status(400).send(`Posting new peep failed`);
    // res.status(409).json({ message: error.message });
  }
};

// export const getPeep = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const peep = await PeepModel.findById(id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const getPeeps = async (req, res) => {
  try {
    const peeps = await PeepModel.find({});
    res
      .status(200)
      .json(peeps)
      .sort((a, d) => {
        return new Date(b.peepTimePosted) - new Date(a.peepTimePosted);
      });
    peeps.sort((a, b) => {});
  } catch (error) {
    res.status(500).json(error);
  }
};
