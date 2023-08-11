import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {},
  password: {},
  first_name: {},
  last_name: {},
  username: {},
});

const User = mongoose.model("User", UserSchema);

export default User;
