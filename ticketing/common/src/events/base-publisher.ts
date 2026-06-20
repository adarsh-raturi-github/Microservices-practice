import nats from "node-nats-streaming";
import { SubjectAndMessageDataMap, SubjectEnum } from "../types";

export abstract class Publisher<T extends SubjectEnum> {
  private client: nats.Stan;
  abstract subject: T;

  constructor(client: nats.Stan) {
    this.client = client;
  }

  publish(data: SubjectAndMessageDataMap[T]): Promise<void> {
    const stringifyData = JSON.stringify(data);
    return new Promise((res, rej) => {
      this.client.publish(this.subject, stringifyData, (err) => {
        if (err) {
          return rej(err);
        }
        console.log(stringifyData, "published on channel", this.subject);
        res();
      });
    });
  }
}
