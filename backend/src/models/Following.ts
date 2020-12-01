import { Schema, model, Document } from "mongoose";

export interface FollowingInterface extends Document {
  id_user: string;
  id_user_following: string;
  created_at: string;
  updated_at: string;
}

const FollowingSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  id_user_following: { type: String, required: true },
  created_at: { type: String, currentTime: () => Math.floor(Date.now()) },
  updated_at: { type: String, currentTime: () => Math.floor(Date.now()) },
});

export default model<FollowingInterface>("Following_insta", FollowingSchema);
