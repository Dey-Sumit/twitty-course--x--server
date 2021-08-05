import mongoose from "mongoose";

type mongoose_id = string | mongoose.Types.ObjectId;

export interface IUser {
  _id: mongoose_id;
  name: string;
  username: string;
  password: string;
  profilePicture: string;
  bio: string;
}
