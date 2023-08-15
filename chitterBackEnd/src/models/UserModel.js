import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      max: 15,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 10,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
