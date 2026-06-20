import { Publisher, SubjectEnum } from "@adarsh-tickets/common";
export class TicketCreatedPublisher extends Publisher<SubjectEnum.TicketCreated> {
  readonly subject = SubjectEnum.TicketCreated;
}
