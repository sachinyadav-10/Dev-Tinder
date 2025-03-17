const express = require("express");
const connectDB=require('./config/database.js');
const app = express();
const User = require("./models/user.js");
app.use(express.json());

app.post("/signup",async (req,res)=>{
    // this create a new instance of the user model and store data in that model
    const user= new User(req.body); 
    try {
        // this will goning to save the data we created for the new user
        await user.save();
        res.send("user added succesfully");
    } catch (error) {
        res.status(400).send("error saving the user"+ err.message);
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

app.patch("/user", async(req,res)=>{
    try {
        const data= req.body;
        const userId = req.body.userId;
        const info = await User.findByIdAndUpdate(userId,data,{returnDocument:"after"});
        res.send(info)

    } catch (error) {
        res.status(400).send("error saving the user"+ err.message);
        
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

connectDB()
    .then(()=>{
        console.log("Database conneccted Sucessfully");
        app.listen(3000,()=>{
            console.log("server listening on port 3000");
            
        });         
    }).catch(err=>{
        console.error("Database connot be connected");
            
    })
