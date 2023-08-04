import mongoose from "mongoose"


export const dataBase = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "User_Admin_Data"
    }).then((res) => {
        console.log("DataBase connected")
    }).catch((error) => {
        console.log('error:', error)

    })
}