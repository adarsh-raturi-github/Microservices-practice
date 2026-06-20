import nats from "node-nats-streaming";
import { TicketCreatePublish } from "./events/ticket-create-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher Connected");
  const publisher = new TicketCreatePublish(stan);

  const data = {
    id: "123",
    title: "Coldpay1",
    price: 400,
    userId: "12",
  };
  try {
    await publisher.publish(data);
  } catch (e) {
    console.error(e);
  }
});
