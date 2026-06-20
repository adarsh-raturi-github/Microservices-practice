import { Publisher, SubjectEnum } from "@adarsh-tickets/common";
export class TicketUpdatedPublisher extends Publisher<SubjectEnum.TicketUpdated> {
  readonly subject = SubjectEnum.TicketUpdated;
}
