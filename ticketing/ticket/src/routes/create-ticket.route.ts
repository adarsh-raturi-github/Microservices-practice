import {
  notAuthorizeMiddleware,
  RequestValidationError,
  validateRequestMiddleware,
} from "@adarsh-tickets/common";
import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { TicketCreatedPublisher } from "../events/publishers";
import { NatsWrapper } from "../nats-wrapper";
const router = Router();

router.post(
  "/api/tickets",
  notAuthorizeMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title not valid"),
    body("price").isFloat({ gt: 0 }).withMessage("Price not valid"),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const currentUser = req.currentUser!;
    const ticket = Ticket.buildTicket({
      title,
      price,
      userId: currentUser.id,
    });

    await ticket.save();
    const natsWrapper = NatsWrapper.getInstance();
    const client = natsWrapper.client;
    new TicketCreatedPublisher(client).publish({
      id: ticket.id,
      title,
      price,
      userId: currentUser.id,
    });

    return res.status(201).send(ticket);
  },
);

export { router as createTicketRouter };
