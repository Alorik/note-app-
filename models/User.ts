import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // stored hashed
  image: { type: String },
});

export default models.User || mongoose.model("User", userSchema);
