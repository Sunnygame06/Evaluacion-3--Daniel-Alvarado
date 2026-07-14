/* 
    customerId,
    quantity,
    purchaseDate,
    total,
    paymentStatus,
    TransactionId
*/

import {Schema, model} from "mongoose";

const ticketSchema = new Schema({
    customerId: {type: Schema.ObjectId},
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: String},
    TransactionId: {type: Schema.ObjectId}
}, {
    timestamps: true,
    strict: false
})

export default model("Ticket", ticketSchema)