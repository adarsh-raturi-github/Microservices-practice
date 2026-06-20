import { Publisher, SubjectEnum } from "@adarsh-tickets/common";

export class TicketCreatePublish extends Publisher<SubjectEnum.TicketCreated> {
  subject: SubjectEnum.TicketCreated = SubjectEnum.TicketCreated;
}
