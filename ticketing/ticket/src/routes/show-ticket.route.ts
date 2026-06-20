import { Router, Request, Response } from "express";
import { Ticket } from "../models/ticket.model";
import { BadRequestError, NotFoundError } from "@adarsh-tickets/common";

const router = Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const ticket = await Ticket.findOne({ id });
  if (!ticket) {
    throw new NotFoundError();
  }
  return res.send(ticket);
});

export { router as showTicketRoute };
