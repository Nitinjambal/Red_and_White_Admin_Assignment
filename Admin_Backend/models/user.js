import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String,required:true}
})

export const User = mongoose.model("User", userSchema);