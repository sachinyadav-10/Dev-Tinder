const express = require("express");
const connectDB=require('./config/database.js');
const app = express();
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./validation.js");
const { isValidObjectId } = require("mongoose");
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.get("/user",async(req,res)=>{
    const userInfo =req.body.emailId; 
    const data = await User.find({emailId:userInfo})
    res.send(data);
})

app.get("/feed",async(req,res)=>{
    const data = await User.find({});
    res.send(data);
})

app.delete("/user",async(req,res)=>{
    try {
        const userId = req.body.userId;
        const data = await User.findByIdAndDelete(userId);
        console.log(data);
        res.send("user deleted sucessfully");
        
    } catch (error) {
        res.status(400).send("error saving the user"+ err.message);
    }
    
})

app.patch("/user/:userId", async(req,res)=>{
    try {
        const data= req.body;
        const userId = req.params?.userId;
        const ALLOWED_UPDATES = [
            "userId",
            "age", 
            "gender",
            "skills",
            "firstName",
            "LastName",
            "about"
        ]
        const isAllowedUpdate=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k));
        if(!isAllowedUpdate){
            throw new Error("Entered data is not valid")
        }
        if(data?.skills.length>10){
            throw new Error("skills cant be more than 10")
        }
        const info = await User.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true,});
        res.status(200).send("user updated sucessfully");

    } catch (err) {
        res.status(400).send("error in updating :"+ err.message);
        
    }
});

app.patch("/userbyemail", async (req,res)=>{
    const { emailId, ...updateFields } = req.body; 
        const info = await User.findOneAndUpdate(
            { emailId },
            { $set: updateFields }, 
            { new: true } 
        );
        res.send(info);
})
app.post("/login", async(req,res)=>{
    try {
        const {emailId,password}=req.body;
        const user = await User.findOne({emailId:emailId});
        
        if(!user){
            throw new Error("email or password is incorrect")
        }
        
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("login sucessfull")
        }
        else {
            throw new Error("email or password is incorrect");
        }
    } catch (error) {
        res.status(400).send("ERROR :" +error.message);
    }
})

connectDB()
    .then(()=>{
        console.log("Database conneccted Sucessfully");
        app.listen(3000,()=>{
            console.log("server listening on port 3000");
            
        });         
    }).catch(err=>{
        console.error("Database connot be connected");
            
    })
