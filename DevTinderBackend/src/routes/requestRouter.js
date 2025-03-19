const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");


requestRouter.post("/sendconnectionrequest",userAuth,async(req,res)=>{
    //sending a connection request 
    console.log("sending an request");
    res.send("reques sent sucessfully");
    
})

module.exports = requestRouter