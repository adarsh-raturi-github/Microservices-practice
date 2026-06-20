import nats, { Message } from "node-nats-streaming";
import { SubjectAndMessageDataMap, SubjectEnum } from "../types";

export abstract class Listener<T extends SubjectEnum> {
  private client: nats.Stan;
  abstract subject: T;
  abstract queueGroupName: string;
  abstract onMessage(data: SubjectAndMessageDataMap[T], msg: Message): void;
  private ackWait: number = 5 * 1000;

  constructor(client: nats.Stan) {
    this.client = client;
  }

  setSubscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscriptions = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.setSubscriptionOptions(),
    );
    subscriptions.on("message", (msg: Message) => {
      const data = this.parseMessage(msg);
      this.onMessage(data, msg);
    });
  }

  parseMessage(message: Message) {
    const data = message.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
