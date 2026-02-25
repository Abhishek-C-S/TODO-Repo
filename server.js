import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import Todoroutes from "./Routes/Todoroutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todo",Todoroutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log(err));

app.listen(5000,()=>console.log("Server is running on port 5000"));