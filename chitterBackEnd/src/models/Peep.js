import mongoose from "mongoose";

const peepSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  peepDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  peepTimePosted: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Peep = mongoose.model("Peep", peepSchema);

export default Peep;
