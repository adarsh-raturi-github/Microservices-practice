import { Request, Response, NextFunction } from "express";
import { NoAuthenicateError } from "../errors";
export const notAuthorizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NoAuthenicateError("Expired User");
  }
  next();
};
