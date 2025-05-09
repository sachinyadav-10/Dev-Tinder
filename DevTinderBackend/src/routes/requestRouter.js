const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { ConnectionRequest } = require("../models/connectionRequest.js");
const User=require("../models/user.js");


requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const { status, toUserId } = req.params;
            const fromUserId = req.user._id;

            //  Check if the status is allowed
            const allowedStatuses = ["ignore", "intrested"];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ error: `Invalid status: ${status}` });
            }

            //  Prevent self-request
            if (fromUserId.toString() === toUserId) {
                return res.status(400).json({ error: "You cannot send a connection request to yourself." });
            }

            // Check if a request already exists (bi-directional)
            const existing = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            });

            if (existing) {
                return res.status(409).json({ error: "Connection request already exists." });
            }
            // check wether toUserId exists or not
            const toUserExists= await User.findById(toUserId);
            if(!toUserExists){
                return res.status(404).json({message:"User not found"});
            }
            // Create and save the new request
            const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });
            const data = await connectionRequest.save();

            res.status(201).json({
                message: req.user.firstName+"is"+status +"in" + toUserExists.firstName ,
                data
            });

        } catch (error) {
            res.status(500).json({ error: "ERROR: " + error.message });
        }
    }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accept", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: `Invalid status: ${status}` });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "intrested",
        });
        
        if (!connectionRequest) {
            return res.status(400).json({ message: "Connection request not found." });
        }

        connectionRequest.status = status;
        const updatedRequest = await connectionRequest.save();

        return res.json({
            message: `Request ${status}ed successfully.`,
            data: updatedRequest,
        });

    } catch (error) {
        return res.status(500).json({ error: "Server Error: " + error.message });
    }
});

module.exports = requestRouter;