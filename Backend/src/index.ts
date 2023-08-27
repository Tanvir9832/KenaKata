
import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors'
import { sampleProduct } from "./data";
import { db } from "./db/db";

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());



app.get("/",(req : express.Request,res : express.Response)=>{
    res.status(200).json(sampleProduct);
})

app.get('/api/products/:id',(req : express.Request , res : express.Response)=>{
    res.json(sampleProduct.find((x)=>x.id === Number(req.params.id)));
})

// db();
app.listen(process.env.PORT || 4000 ,()=>{
    console.log("server is running");
})