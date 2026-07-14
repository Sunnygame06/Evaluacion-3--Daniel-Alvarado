import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../../config.js";

import customerModel from "../models/customer.js";

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const customerFound = await customerModel.findOne({email})

        if(!customerFound){
            return res.status(400).json({messge: "Email doesn't exist"})
        }

        if(customerFound.timeOut && customerFound.timeOut > Date.now()){
            return res.status(403).json({message: "Error"})
        }

        const isMatch = await bcryptjs.compare(password, customerFound.password)

        if(!isMatch){
            customerFound.loginAttempts = (customerFound.loginAttempts || 0) + 1

            if(customerFound.loginAttempts >= 5){
                customerFound.timeOut = Date.now() + 5 * 60 * 1000;
                customerFound.loginAttempts = 0;

                await customerFound.save();

                return res.status(403).json({message: "User bloqueado"})
            }
            await customerFound.save();

            return res.status(401).json({message: "error"})
        }

        
    } catch (error) {
        
    }
}