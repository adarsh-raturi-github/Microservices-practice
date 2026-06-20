import {
  NoAuthenicateError,
  notAuthorizeMiddleware,
  NotFoundError,
  validateRequestMiddleware,
} from "@adarsh-tickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { TicketUpdatedPublisher } from "../events/publishers";
import { NatsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put(
  "/api/tickets/:id",
  notAuthorizeMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title not valid"),
    body("price").isFloat({ gt: 0 }).withMessage("Price not valid"),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, price } = req.body;
    const ticket = await Ticket.findOne({ id });
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NoAuthenicateError("Ticket not authorize");
    }
    ticket.set({
      title,
      price,
    });
    await ticket.save();
    const natsWrapper = NatsWrapper.getInstance();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title,
      price,
      userId: ticket.userId,
    });
    return res.send(ticket);
  },
);

export { router as updateTicketRoute };
