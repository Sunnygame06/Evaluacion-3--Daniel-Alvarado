import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"

import customerModel from "../models/customer.js"

const registerCustomerController = {};

registerCustomerController.register = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        const exitsCustomer = await customerModel.findOne({email})

        if(exitsCustomer){
            return res.status(400).json({message: "Email already exits"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            email,
            password: passwordHashed,
            isVerified,
            loginAttempts,
            timeOut
        },
        config.JWT.secret,
        {expiresIn: "15m"});

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_pass
            },
        })

        Transporter.sendMail(mailOptions, (error, info)=> {
            if(error){
                console.log("error"+error)
                return res.status(500).json({message: "Internal Server Error"})
            }
            return res.status(200).json({message: "Email sent"})
        })
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

registerCustomerController.verifyCode = async(req, res) => {
    try{
        const {code} = req.body;

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode,
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = decoded

        if(code !== storedCode){
            return res.status(400)-json({message: "The code doesn't match"})
        }

        const newCustomer = customerModel({
            name,
            email,
            password,
            isVerified: true,
            loginAttempts,
            timeOut
        });

        await newCustomer.save();

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Customer saved"})
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerCustomerController;