/* 
    customerId,
    quantity,
    purchaseDate,
    total,
    paymentStatus,
    TransactionId
*/

import mongoose, {Schema, model} from "mongoose";

const ticketSchema = new Schema({
    customerId: {type: mongoose.Schema.ObjectId, ref: "Customer"},
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: String},
    TransactionId: {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model("Ticket", ticketSchema)