import UserModel from "@models/User.model";
import { Request, Response } from "express";

export const login = async () => {};

export const logout = () => {};

export const signup = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;
  console.log("here");

  const emailExists = await UserModel.findOne({ email });

  const usernameExists = await UserModel.findOne({ username });

  if (emailExists) {
    return res.status(403).json({ message: "Email already exists" });
  }

  if (usernameExists) {
    return res.status(403).json({ message: "Username already exists" });
  }

  //const user = await UserModel.create({ name, username, email, password });
  const user = await UserModel.findById("610bd1624eff8505609f6618");
  // TODO log in the user
  return res.status(200).json({ user });
};
