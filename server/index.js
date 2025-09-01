import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./router/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        .then(() => console.log('DB CONNECTED'))
        .catch((err) => console.log('error: ',err))
    
        app.listen(PORT, () => console.log('SERVER UP'));
    } catch (err) {
        console.log(err);
    }
}


start ();
