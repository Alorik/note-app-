import mongoose, { Schema, Document, models } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
}

const noteSchema: Schema<INote> = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Note || mongoose.model<INote>("Note", noteSchema);
