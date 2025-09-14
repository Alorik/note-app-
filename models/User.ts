import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  password?: string; // optional for OAuth
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    image: { type: String },
    password: { type: String, minlength: 6, required: false },
  },
  { timestamps: true }
);

// Avoid recompilation error in Next.js
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
