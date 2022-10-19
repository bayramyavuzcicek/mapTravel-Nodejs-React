import express from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
const router  = express.Router();

//REGISTER  
router.post("/register", async (req,res)=>{
    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //create a new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    //save user and response
    try {
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login",async (req,res)=>{
    //find user 
    const user = await User.findOne({username: req.body.username});
    !user && res.status(404).json("There is no username like that!");
    //validate password
    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    !isPassword && res.status(403).json("Wrong Credentials");
    //send response
    const {password, ...others} = user._doc;
    res.status(200).json(others);
})

export default router;