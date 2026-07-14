import express from "express"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"

const app = express

app.use(cookieParser());

app.use("/api/registerCustomer", registerCustomerRoutes);

export default app;