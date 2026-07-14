import express from "express"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js";
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import wompiRoutes from "./src/routes/wompi.js"
import ticketRoutes from "./src/routes/ticket.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/loginCustomer", loginCustomerRoutes);
app.use("/api/registerAdmin", registerAdminRoutes);
app.use("/api/loginAdmin", loginAdminRoutes);
app.use("/api/wompi", wompiRoutes);
app.use("/api/ticket", ticketRoutes);

export default app;