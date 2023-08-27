import mongoose from "mongoose";



export async function db(){
    try {

        await mongoose.connect("mongodb+srv://Tanvir:191491ttss@cluster0.nsu4xro.mongodb.net/KenaKata");
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
}