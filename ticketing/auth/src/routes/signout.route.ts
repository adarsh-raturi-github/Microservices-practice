import express, { Request } from "express";
const router = express.Router();
router.post("/api/users/signout", (req: Request, res) => {
  req.session = null;

  return res.send({});
});

export { router as signOutRouter };
