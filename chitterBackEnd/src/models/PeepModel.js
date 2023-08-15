import mongoose from "mongoose";

const peepSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    peepDesc: {
      type: String,
      required: true,
      trim: true,
      // maxlength: 280,
    },
    peepTimePosted: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const PeepModel = mongoose.model("Peep", peepSchema);

export default PeepModel;
