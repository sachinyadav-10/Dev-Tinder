const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateProfileEditData } = require("../validation.js");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {

        // Find the user by req
        const user=req.user;

        // Send the user profile as a response
        res.status(200).json({ user });

    } catch (error) {
        console.error("Error in /profile route:", error.message);
        res.status(400).send("ERROR: " + error.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    
    try {

        if(!validateProfileEditData(req)){
            throw new Error("Invalid edit request")
            }
        const loggedInUser=req.user;
        
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]=req.body[key]
            })
        await loggedInUser.save();
        
        res.json({
        message: `${loggedInUser.firstName}, your profile is updated`,
        data: loggedInUser
            })
    } catch (error) {
      res.status(400).send("ERROR :"+error.message);  
    }

})

module.exports = profileRouter