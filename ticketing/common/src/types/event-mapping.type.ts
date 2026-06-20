import { IOrderCreateData, ITicketCreateData } from "./event.types";
import { SubjectEnum } from "./subject.type";

export interface SubjectAndMessageDataMap {
  [SubjectEnum.TicketCreated]: ITicketCreateData;
  [SubjectEnum.TicketUpdated]: ITicketCreateData;
  [SubjectEnum.OrderCreated]: IOrderCreateData;
}
