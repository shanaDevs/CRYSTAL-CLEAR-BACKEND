import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },
    firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
    default: "Not given",
  },
  isDisabled: {
    type: Boolean,
    default: false,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },

});

const User = mongoose.model("User", userSchema);

export default User;