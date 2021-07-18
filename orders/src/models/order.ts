import mongoose, { mongo } from 'mongoose';
import {OrderStatus} from '@allenzhanglib/common';
import {TicketDoc} from './ticket'; 

export {OrderStatus}

// An interface that describes the properties
// that are requried to create a new order
interface OrderAttrs{
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

// An interface that describes the properties
// that a Order Document
interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc; 
}

// An interface that describes the properties
// that a order Model has
interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs:OrderAttrs): OrderDoc; 
}


// order schema 
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true 
    },
    status:{
        type:String,
        required:true, 
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created 
    },
    expiresAt:{
        type: mongoose.Schema.Types.Date, 
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id; 
        }
    }
})

orderSchema.statics.build = (attrs: OrderAttrs)=>{
    return new Order(attrs); 
}
const Order = mongoose.model<OrderDoc, OrderModel>('Order',orderSchema);

export {Order}