import UserModel from "@models/User.model";
import { Request } from "express";
import passport from "passport";
import { Strategy as LocalStratagy } from "passport-local";

const findUserByUsername = async (username: string) => {
  return await UserModel.findOne({ username });
};

const findUserById = async (id: string) => {
  return await UserModel.findById(id);
};

passport.use(
  new LocalStratagy(
    {
      usernameField: "username", // password field is by default password
      //   passReqToCallback: true, // if set, req becomes the first user, useful for additional data from the request
    },
    async (username, password, done) => {
      // check if the user exist

      const user = await findUserByUsername(username);

      //@ts-ignores
      if (user && (await user.checkPassword(password))) done(null, user);
      // uhh!!! invalid credentials
      else done(null, false);
    }
  )
);

// done is the next middleware
// put the data(user id) into the session if login successful
passport.serializeUser((user: any, done) => {
  console.log("serializeUser ->", user);
  done(null, user._id);
});

// get the serialized data(user id) from the session and retrieve the user, on every request
passport.deserializeUser(async (req: Request, id: string, done: any) => {
  try {
    console.log("deserializeUser ->", id);

    const user = await findUserById(id);

    done(null, user);
  } catch (error) {
    // something went wrong :(
    done(error);
  }
});

export default passport;
