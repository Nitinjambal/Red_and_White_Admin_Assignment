import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js"
import { dataBase } from "./data/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"

//server
const app=express();




//env file
config({
    path:"./data/config.env"
})


//dataBase
dataBase()


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))



//routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",ProductRouter)



app.get("/",(req,res)=>{
 res.send("working")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
})