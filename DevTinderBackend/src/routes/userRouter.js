const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User= require("../models/user.js");
const USER_SAFE_DATA="firstName lastName age gender skills photourl";

userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        }).populate("fromUserId",USER_SAFE_DATA);
        res.json({
            message: "Data fetched successfully",
            connectionRequest,
        });
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id ,status:"accept"},
                {fromUserId:loggedInUser._id ,status:"accept"}
            ],

        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        
        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        
        res.json({data : connectionRequest});
    } 
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    // user shuld see all the user cards except
    // 1.his own card 
    // 2.his connections
    // 3.ignored people
    // 4.already sent the connection
    try {
        
        const loggedInUser=req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 3;
        limit=limit >50 ? 50 : limit;
        const skip = (page-1)*limit;
        // find all the connection request that i have sent or recived
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId : loggedInUser._id},
                {toUserId:loggedInUser._id}
            ],
        }).select("fromUserId toUserId");
        
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        }); 
        
        const users = await User.find({
            $and: [
                {_id: {$nin : Array.from(hideUsersFromFeed) } },
                {_id : {$ne : loggedInUser._id} },
            ],
        }).select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);
        
        res.json({ data : users });

    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

module.exports = userRouter ;
