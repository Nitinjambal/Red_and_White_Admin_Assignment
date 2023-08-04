import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    "title":{type:String,required:true,unique:true},
    "description":{type:String},
    "image":{type:String,required:true},
    "price":{type:Number,required:true},
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Product=mongoose.model("Product",productSchema);