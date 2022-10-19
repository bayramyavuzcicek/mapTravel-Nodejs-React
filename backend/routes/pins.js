import express from 'express';
import Pin from '../models/Pin.js'
import bcrypt from 'bcryptjs'
const router  = express.Router();

//CREATE PIN  
router.post("/", async (req,res)=>{
    const newPin = new Pin(req.body)
    try {
        const createdPin = await newPin.save();
        res.status(200).json(createdPin);
    } catch (err) {
        res.status(500).json(err);;
    }
})


export default router;