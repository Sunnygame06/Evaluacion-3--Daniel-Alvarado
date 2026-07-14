import express from "express"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js";
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json);

app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/loginCustomer", loginCustomerRoutes);
app.use("/api/registerAdmin", registerAdminRoutes);
app.use("/api/loginAdmin", loginAdminRoutes);

export default app;