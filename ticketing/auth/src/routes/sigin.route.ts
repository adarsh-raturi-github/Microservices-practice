import express, { Request, Response } from "express";
import { body } from "express-validator";

import { User } from "../models/user.model";
import { PasswordManagementHelperService } from "../services";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  validateRequestMiddleware,
} from "@adarsh-tickets/common";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Enter Password"),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Email not exist");
    }
    if (req.session?.jwt) {
      console.log("**");
    }

    const isMatched = await PasswordManagementHelperService.compare(
      user.password,
      password,
    );
    if (isMatched) {
      // sign and add JWT
      const userToken = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_KEY!,
      );
      console.log("token", userToken);
      req.session = {
        jwt: userToken,
      };

      console.log("***njhjhbj", req.session?.jwt);
      return res.send(user);
    }
    throw new BadRequestError(" Incorrect Credentials");
  },
);

export { router as signInUserRouter };
