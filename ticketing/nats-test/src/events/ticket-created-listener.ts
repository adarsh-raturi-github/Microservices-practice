import {
  ITicketCreateData,
  Listener,
  SubjectEnum,
} from "@adarsh-tickets/common";
import { Message } from "node-nats-streaming";

export class TicketCreateListener extends Listener<SubjectEnum.TicketCreated> {
  subject: SubjectEnum.TicketCreated = SubjectEnum.TicketCreated;
  queueGroupName = "payments-service";
  onMessage(data: ITicketCreateData, msg: Message): void {
    // code;
    console.log(data.id);
    msg.ack();
  }
}
