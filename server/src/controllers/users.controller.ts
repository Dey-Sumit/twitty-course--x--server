import UserModel from "@models/User.model";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createError from "http-errors";
import { v2 as cloudinary } from "cloudinary";

export const getUserById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) throw new createError.NotFound();
  return res.json(user);
});

export const deleteUserById = expressAsyncHandler(async (req: Request, res) => {
  if (req.params.id !== req.user?._id.toString()) throw new createError.Unauthorized();

  const user = await UserModel.findById(req.params.id);

  if (!user) throw new createError.NotFound();

  //TODO  delete all posts of the user

  await user.remove();

  res.status(200).json({ msg: "User deleted" });
});

export const updateUserById = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // check auth & if it's his/her own profile
  if (req.user._id.toString() !== id) throw new createError.Unauthorized();

  const { name, username, bio } = req.body;

  let profilePicture: string = "";

  if (req.file) {
    // console.log(req.file);

    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "lol-x",
    });
    profilePicture = image.secure_url;
    console.log(image.secure_url, image.url);
  }

  const oldUser = await UserModel.findById(id);

  if (!oldUser) throw new createError.NotFound();

  const profileFields = {
    name: name || oldUser.name,
    username: username || oldUser.username,
    bio: bio || oldUser.bio,
    profilePicture: profilePicture || oldUser.profilePicture,
  };

  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      $set: profileFields,
    },
    {
      new: true,
    }
  );

  res.status(200).json(user);
});

export const searchUser = expressAsyncHandler(async (req, res) => {
  const q = req.query?.q?.toString();

  if (!q) throw new createError.BadRequest("pass the keyword");

  const searchObj = {
    $or: [{ name: { $regex: q, $options: "i" } }, { username: { $regex: q, $options: "i" } }],
  };
  const users = await UserModel.find(searchObj, "profilePicture name username");
  res.status(200).json(users);
});
