const express = require("express");
const connectDB=require('./config/database.js');
const app = express();
const cookieParser = require("cookie-parser");
const User = require("./models/user.js");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter.js");
const profileRouter = require("./routes/profileRouter.js");
const requestRouter = require("./routes/requestRouter.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


app.get("/user",async(req,res)=>{
    const userInfo =req.body.emailId; 
    const data = await User.find({emailId:userInfo})
    res.send(data);
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
