import { NextFunction, Request, Response } from "express";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`NOT Found - ${req.originalUrl}`);
  res.status(404);
 /*    res.json({
      message: "Not Found",
    }); */
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction //  because next is not used,don't omit that, else it will not work:) I spend my entire day to debug this
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const message = err.message;

  res.status(statusCode);

  res.json({
    message,
  });
}
