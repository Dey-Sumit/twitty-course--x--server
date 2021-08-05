import { NextFunction, Request, Response } from "express";
import session from "express-session";

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return session({
    secret: "safdaldfmakfn", //process.env.SESSION_SECRET! // secret hash
    resave: false, // Forces the session to be saved back to the session store,
    // even if the session was never modified during the request; it is not needed for most of the cases
    saveUninitialized: false, // if false, then it will only create session if the user is logged in,show examples, it will be
    // created again when we implement passport js for the login
  })(req, res, next);
};

export default sessionMiddleware;
