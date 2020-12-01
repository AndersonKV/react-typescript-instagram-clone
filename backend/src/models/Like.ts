import { Schema, model, Document } from "mongoose";

export interface LikeInterface extends Document {
  id_user: string;
  id_post: string;
  created_at: string;
  updated_at: string;
}

const UserSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  id_post: { type: String, required: true },
  created_at: { type: String, currentTime: () => Math.floor(Date.now()) },
  updated_at: { type: String, currentTime: () => Math.floor(Date.now()) },
});

export default model<LikeInterface>("Like_insta", UserSchema);
