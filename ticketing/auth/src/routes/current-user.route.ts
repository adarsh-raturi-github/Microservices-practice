import express, { Request, Response } from "express";
import { currentUserMiddleware } from "../middlewares";
import { notAuthenicateMiddleware } from "../middlewares/not-authorize.middleware";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
