import mongoose  from "mongoose";
import {Order,OrderStatus} from './order';


// An interface that describes the properties
// that are requried to create a new ticket
interface TicketAttrs{
    titile: string;
    price: number; 
}

// An interface that describes the properties that a ticket model has 
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs:TicketAttrs): TicketDoc; 
}

// an interfact that describes the properties that a ticket document has 
export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number; 
    isReserved(): Promise<boolean>;
}

// schema 

const ticketSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    }
  );
  
  ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
  };
  ticketSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
    const existingOrder = await Order.findOne({
      ticket: this as any,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });
  
    return !!existingOrder;
  };
  
  const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);
  
  export { Ticket };
  