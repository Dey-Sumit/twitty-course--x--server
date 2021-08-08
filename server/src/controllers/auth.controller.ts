import extractUser from "@libs/extractUser";
import passport from "@middlewares/passport.middleware";
import { validationFormatter } from "@middlewares/validator.middleware";
import UserModel from "@models/User.model";
import { NextFunction, Request, Response } from "express";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", function (err, user, info) {
    if (!user) return res.status(401).json({ message: "username or password is not correct" });

    req.login(user, (err) => {
      if (err) throw err;
      // TODO add extract user
      res.status(201).json({ user: extractUser(req.user) });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logOut();
  res.status(204).end();
};

/**
 * @method POST
 * @access Private
 * @endpoint api/auth/signup
 */

export const signup = async (req: Request, res: Response) => {
  const errors = validationFormatter(req).array();

  if (errors.length > 0) {
    return res.status(422).json(errors[0]);
  }

  const { name, username, email, password } = req.body;

  const emailExists = await UserModel.findOne({ email });

  const usernameExists = await UserModel.findOne({ username });

  if (emailExists) {
    return res.status(403).json({ message: "Email already exists" });
  }

  if (usernameExists) {
    return res.status(403).json({ message: "Username already exists" });
  }

  const user = await UserModel.create({ name, username, email, password });
  // const user = await UserModel.findById("610bd1624eff8505609f6618");
  // TODO log in the user
  // return res.status(200).json({ user });
  req.login(user, (err) => {
    if (err) throw err;

    res.status(201).json({ user: extractUser(req.user) });
  });
};
