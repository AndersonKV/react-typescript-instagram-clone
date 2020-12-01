import { Schema, model, Document } from "mongoose";

export interface CommentInterface extends Document {
  id_user: string;
  id_post: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

const CommentSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  id_post: { type: String, required: true },
  comment: { type: String, required: true },
  created_at: { type: String, currentTime: () => Math.floor(Date.now()) },
  updated_at: { type: String, currentTime: () => Math.floor(Date.now()) },
});

export default model<CommentInterface>("Comment_insta", CommentSchema);
