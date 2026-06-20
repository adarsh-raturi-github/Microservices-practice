import mongoose from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}
interface TicketDocument extends mongoose.Document {
  id: string;
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  buildTicket(attrs: TicketAttrs): TicketDocument;
}
const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.__id;
      },
    },
  },
);
export const Ticket = mongoose.model<TicketDocument, TicketModel>(
  "Tikcet",
  ticketSchema,
);

ticketSchema.statics.buildTicket = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
