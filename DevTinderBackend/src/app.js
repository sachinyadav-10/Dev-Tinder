const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("hello form the testing team");
})
app.use("/hello",(req,res)=>{
    res.send("hello hello hello hello");
})
app.use("/",(req,res)=>{
    res.send("hello form the Dashbord");
})

app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
});

