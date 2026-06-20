import crypto from "crypto";
import nats from "node-nats-streaming";
import { TicketCreateListener } from "./events/ticket-created-listener";

console.clear();
const randomId = crypto.randomBytes(6).toString("hex");
const stan = nats.connect("ticketing", randomId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected");

  stan.on("close", () => {
    console.log("connnection close");
    process.exit();
  });
  new TicketCreateListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
