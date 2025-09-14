import mongoose, { Schema, Document, models } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const noteSchema: Schema<INote> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Note || mongoose.model<INote>("Note", noteSchema);
