const express = require("express");
const connectDB=require('./config/database.js');
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin :"http://localhost:5173",
    credentials:true
}
))

const authRouter = require("./routes/authRouter.js");
const profileRouter = require("./routes/profileRouter.js");
const requestRouter = require("./routes/requestRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB()
    .then(()=>{
        console.log("Database conneccted Sucessfully");
        app.listen(3000,()=>{
            console.log("server listening on port 3000");
            
        });         
    }).catch(err=>{
        console.error("Database connot be connected");
            
    })
