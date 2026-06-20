import { currentUserMiddleware } from "@adarsh-tickets/common";
import express, { Request, Response } from "express";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
