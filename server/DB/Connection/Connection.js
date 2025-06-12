import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const ConnectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOBD_URI);
        console.log('Database is connected successfully');

    } catch (error) {
        console.log(error);
        console.log('Database is failed to connect');
    }
}