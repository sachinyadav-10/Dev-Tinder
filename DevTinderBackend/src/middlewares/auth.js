const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req,res,next)=>{
    const cookies = req.cookies;
    const { token } = cookies;

    // Check if token exists
    if (!token) {
        return res.status(401).send("Unauthorized: Token not found");
    }

    // Verify the token
    const decodedMessage = await jwt.verify(token, "king@Tinder123");

    // Extract user ID from the decoded token
    const { _id } = decodedMessage;

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).send("User not found. Please login again.");
    }
    req.user=user;
    next();
}
module.exports={
    userAuth,
};