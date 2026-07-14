import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Sunnygame06:Rical123@cluster-alvarado.vtnvxno.mongodb.net/TodoTicket2B")

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB is connected")
})

connection.on("disconnected", ()=>{
    console.log("disconnected")
})

connection.on("error", (error)=>{
    console.log("Error found: " + error)
})