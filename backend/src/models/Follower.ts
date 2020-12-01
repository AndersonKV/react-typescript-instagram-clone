import { Schema, model, Document } from "mongoose";

export interface FollowerInterface extends Document {
  id_user: string;
  id_user_followers: string;
  created_at: string;
  updated_at: string;
}

const UserSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  id_user_followers: { type: String, required: true },
  created_at: { type: String, currentTime: () => Math.floor(Date.now()) },
  updated_at: { type: String, currentTime: () => Math.floor(Date.now()) },
});

export default model<FollowerInterface>("Followers_insta", UserSchema);
