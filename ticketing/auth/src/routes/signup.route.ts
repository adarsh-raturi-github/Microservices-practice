import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { validateRequestMiddleware } from "../middlewares";
const router = express.Router();
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      throw new BadRequestError("Email alreay in use");
    }

    const user = User.buildUser({ email, password });
    await user.save();
    //Generate JWT
    const userJWT = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    //storing JWT in session ("Put this JWT into the browser's  (cookie)." cookie-session hanle this)
    req.session = {
      jwt: userJWT,
    };
    res.status(201).send(user);
  },
);

export { router as signUpRouter };
