import { NextFunction, Request, Response } from "express";
import { PasswordManagementHelperService } from "../services";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserInterface;
    }
  }
}
export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    next();
  }
  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!,
    ) as UserInterface;
    req.currentUser = payload; //due to base.interface.ts
  } catch (e) {}
  next();
};
