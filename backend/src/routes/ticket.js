import express from "express"
import ticketController from "../controller/ticketController.js"
import { validateAuthCookie } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["admin"]), ticketController.getTickets)
    .post(validateAuthCookie(["customer"]), ticketController.insertTickets)

router.route("/:id")
    .put(validateAuthCookie(["admin", "customer"]), ticketController.updateTicket)
    .delete(validateAuthCookie(["admin"]), ticketController.deleteTicket)

export default router;
