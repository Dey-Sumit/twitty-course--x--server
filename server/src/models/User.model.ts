import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs'
import { IUser } from "@libs/types";
import UserModel from '@models/User.model'

type UserDocument = IUser & Document;

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.checkPassword = async function (enteredPassword) {
    const user = await UserModel.findOne({ username: this.username }).select("password");
  
    return await bcrypt.compare(enteredPassword, user!.password);
  };

UserSchema.pre("save", async function (this, next: Function) {
    // run only if the password field is modified (ex: during update profile)
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
export default mongoose.model<UserDocument>("User", UserSchema);
