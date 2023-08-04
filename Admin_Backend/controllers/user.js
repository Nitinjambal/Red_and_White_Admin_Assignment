import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/cookie.js";




//Register
export const userRegister = async (req, res) => {

    try {
        const { userName, email, password, confirmPassword } = req.body;
        const isUserPresent = await User.findOne({ $or: [{ email }, { userName }] });

        if (isUserPresent) {
            return res.status(404).json({
                success: false,
                message: "User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedConfirmPasswrod = await bcrypt.hash(confirmPassword, 10)
        const newUser = await User.create({
            userName, email, password: hashedPassword, confirmPassword: hashedConfirmPasswrod
        })

        setCookie(res, newUser, 201, "User Registerd Successfully")


    } catch (error) {
        console.log('error:', error)
        return res.status(404).json({
            success: false,
            message: "Something went wrong",

        })
    }
}


//Login
export const userLogin = async (req, res) => {
    try {
        const { email, password, confirmPassword, userName } = req.body;
        const isUserPresent = await User.findOne({ $or: [{ email }, { userName }] });
        if (!isUserPresent) {
            return res.status(404).json({
                success: false,
                message: "Invalid Username or Password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password)
        const isConformPasswordMatch = await bcrypt.compare(confirmPassword, isUserPresent.confirmPassword)


        if (!isPasswordMatch || !isConformPasswordMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Username or Password"
            })
        }

        setCookie(res, isUserPresent, 200, `Welcome back ${isUserPresent.userName}`)

    } catch (error) {
        console.log('error:', error)
        return res.status(404).json({
            success: false,
            message: "Something went wrong",

        })
    }
}

//profile
export const myProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            profile: req.user
        })
    } catch (error) {
        console.log('error:', error)

    }
}

//Logout

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        success: true,
        message: "Logout Successfully"
    })
}


//all_Users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        console.log('error:', error)
        res.status(404).json({
            success: false,
            message: "Something went wrong"
        })
    }
}