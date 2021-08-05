import { NextFunction, Request, Response } from "express";
import session from "express-session";
import connectMongo from "connect-mongo";

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const options = {
    mongoUrl: process.env.DB_URI,
  };

  return session({
    secret: "safdaldfmakfn", //process.env.SESSION_SECRET! // secret hash
    resave: false, // Forces the session to be saved back to the session store,
    // even if the session was never modified during the request; it is not needed for most of the cases
    saveUninitialized: false, // if false, then it will only create session if the user is logged in,show examples, it will be
    // created again when we implement passport js for the login, it will still generate the session id, but will not save

    //!show this example in thunder client or on browser
    store: connectMongo.create(options),
  })(req, res, next);
};

export default sessionMiddleware;
