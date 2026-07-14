import dotenv from "dotenv"

dotenv.config();

export const config = {
    JWT:{
        secret: process.env.JWT_SECRET_KET
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_pass: process.env.USER_PASS
    },
    wompi:{
        grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }   
}