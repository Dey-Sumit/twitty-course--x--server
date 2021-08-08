import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export default async function (req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) throw new createError.Unauthorized();
  next();
}
