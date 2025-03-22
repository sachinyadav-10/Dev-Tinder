const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../validation.js");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

authRouter.get('/',async(req,res)=>{

});

authRouter.post("/signup", async (req, res) => {
    try {
        // Validate the request body
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            throw new Error("Email already exists. Please use a different email.");
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        // Save the user to the database
        await user.save();

        // Send success response (exclude sensitive data like password hash)
        res.status(201).json({
            message: "User added successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
            },
        });
    } catch (err) {
        // Log the error for debugging
        console.error("Error during signup:", err);

        // Send error response
        res.status(400).json({
            message: "ERROR: " + err.message,
        });
    }
});

authRouter.post("/login", async(req,res)=>{
    try {
        const {emailId,password}=req.body;
        const user = await User.findOne({emailId:emailId});
        
        if(!user){
            throw new Error("email or password is incorrect")
        }
        
        const isPasswordValid= await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token",token,{httpOnly:true});
            res.send(user)
        }
        else {
            throw new Error("email or password is incorrect");
        }
    } catch (error) {
        res.status(400).send("ERROR :" +error.message);
    }
})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send("logout sucessfull.......");
});
module.exports = authRouter