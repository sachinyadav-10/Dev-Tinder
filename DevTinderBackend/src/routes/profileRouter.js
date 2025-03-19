const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");


profileRouter.get("/profile",userAuth, async (req, res) => {
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


module.exports = profileRouter