import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors";

export const validateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array);
    throw new RequestValidationError(errors.array());
  }
  next();
};
