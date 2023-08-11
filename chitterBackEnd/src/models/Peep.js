import mongoose from "mongoose";

const peepSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  post_time: {
    type: Date,
    default: Date.now,
  },
});

const Peep = mongoose.model("Peep", peepSchema);
export default Peep;
