import express, { Request } from "express";
const router = express.Router();
router.post("/api/users/signout", (req: Request, res) => {
  if (req.session) {
    delete req.session.jwt;
  }

  return res.send({});
});

export { router as signOutRouter };
