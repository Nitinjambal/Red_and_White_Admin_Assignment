import express from "express";
import { getAllUsers, logout, myProfile, userLogin, userRegister } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

 const router=express.Router();

//register
router.post("/newUser",userRegister) 

//login
router.post("/login",userLogin)


//profile
router.get("/me",isAuthenticated,myProfile)

//Logout
router.get("/logout",logout)

//All_Users
router.get("/allUsers",getAllUsers)

 export default router