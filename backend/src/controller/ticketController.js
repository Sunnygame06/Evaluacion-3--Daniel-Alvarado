import ticketModel from "../models/ticket.js"

const ticketController = {};

//SELECT
ticketController.getTickets = async (req, res) => {
    try {
        const ticket = await ticketModel.find();
        return res.status(200).json(ticket)
    } catch (error) {
        console.log("error" +error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//INSERT
ticketController.insertTickets = async (req, res) => {
    try{
        const {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            TransactionId
        }= req.body;

        const newTicket = new ticketModel({customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            TransactionId
        })

        await newTicket.save();

        return res.status(200).json({message: "Ticket Guardado"})
    }catch (error){
        console.log("error" +error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//UPDATE
ticketController.updateTicket = async (req, res) => {
    try{
        let{
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            TransactionId
        } = req.body;

        const ticketUpdated = await ticketModel.findByIdAndUpdate(req.params.id, {
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            TransactionId
        }, {new: true},);

        if(!ticketUpdated){
            return res.status(404).json({message: "Ticket not found"})
        }

        return res.status(200).json({message: "Ticket Actualizado"})
    }catch (error){
        console.log("error" +error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//DELETE
ticketController.deleteTicket = async (req, res) => {
    try {
        const Deletedticket = await ticketModel.findByIdAndDelete(req.params.id)

        if(!Deletedticket){
            return status(404).json({message: "Ticket not found"})
        }

        return res.status(200).json({message: "Ticket Eliminado"})
    } catch (error) {
        console.log("error" +error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default ticketController