import mongoose from "mongoose";
//import UserModel from "UserModel.js";

const peepSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const PeepModel = mongoose.model("Peep", peepSchema);

export default PeepModel;
