import 'dotenv/config';  // сразу первой строкой

import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index.js";

import { emailService } from './service/email-service.js';
import { userService } from './service/user-service.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('DB CONNECTED')
    
        app.listen(PORT, () => console.log('SERVER UP'));
    } catch (err) {
        console.log(err);
    }
}

start();
