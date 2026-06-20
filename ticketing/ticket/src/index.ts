import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import {
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@adarsh-tickets/common";
import {
  createTicketRouter,
  showAllTicketRoute,
  showTicketRoute,
} from "./routes";
import { updateTicketRoute } from "./routes/update-ticket-route";
import { NatsWrapper } from "./nats-wrapper";

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);
app.use(currentUserMiddleware);
app.use(createTicketRouter);
app.use(showTicketRoute);
app.use(showAllTicketRoute);
app.use(updateTicketRoute);

app.use(errorHandlerMiddleware);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not found");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not found");
  }
  try {
    const natsWrapper = NatsWrapper.getInstance();
    await natsWrapper.connect(
      "ticketing",
      "abc",
      "http://nats-cluster-ip-srv:4222",
    );
    console.log("connected to nats");
    natsWrapper.client.on("close", () => {
      console.log("ticket pod crashed ");
      process.exit();
    });
    process.on("SIGINT", () => {
      console.log("client pod crashed");
      natsWrapper.client.close();
    });
    process.on("SIGTERM", () => {
      console.log("client pod crashed");
      natsWrapper.client.close();
    });
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }

  console.log("connect to db");
  app.listen(3001, () => {
    console.log("...Ticket service started on port 3001!!");
  });
};
start();
