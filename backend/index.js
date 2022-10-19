import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import usersRoutes from './routes/users.js'
import pinsRoutes from './routes/pins.js'
const app = express();

app.use(express.json());
dotenv.config();

// DB connection
async function connection() {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MONGO Connection has been successfully");
    }).catch((err)=>{
        console.log(err);
    })
}
connection();

//routes
app.use("/api/users", usersRoutes);
app.use("/api/pins", pinsRoutes);

app.listen(5000,()=>{
    console.log("Backend is running on 5000");
});

