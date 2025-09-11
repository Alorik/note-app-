import mongoose, { Schema, models } from "mongoose";

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Note || mongoose.model("Note", noteSchema);
