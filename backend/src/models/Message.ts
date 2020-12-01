import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  id_user: string;
  id_auth: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

const MessageSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  id_auth: { type: String, required: true },
  comment: { type: String, required: true },
  created_at: { type: String, currentTime: () => Math.floor(Date.now()) },
  updated_at: { type: String, currentTime: () => Math.floor(Date.now()) },
});
export default model<UserInterface>("Messa_insta", MessageSchema);
