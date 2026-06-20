import { SubjectEnum } from "./subject.type";

export interface ITicketCreateData {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export interface ITicketCreateEvent {
  subject: SubjectEnum.TicketCreated;
  data: ITicketCreateData;
}

////////////////////////////////////////////////////////////////

export interface ITicketUpdateEvent {
  subject: SubjectEnum.TicketUpdated;
  data: ITicketCreateData;
}
////////////////////////////////////////////////////////////////
export interface IOrderCreateData {
  id: string;
  ticketId: string;
  userId: string;
}
export interface IOrderCreateEvent {
  subject: SubjectEnum.OrderCreated;
  data: IOrderCreateData;
}
