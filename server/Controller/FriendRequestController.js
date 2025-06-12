import {FriendRequest}  from "../DB/Model/FriendRequestModel.js"
import {Conversation}  from "../DB/Model/ConversationModel.js"
import {User}  from "../DB/Model/UserModel.js"

export const sendFriendRequest = async (req, res) => {
    try {
        const { to } = req.body;
        const currentUser = req.user;

        if (currentUser._id === to) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        const userExist = await User.findById(to);
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const isFriendRequestExist = await FriendRequest.findOne({
            from: currentUser._id,
            to: to
        });

        if (isFriendRequestExist) {
            return res.status(200).json({ message: "Request already sent" });
        }

        await FriendRequest.create({
            from: currentUser._id,
            to: to
        });

        res.status(201).json({ message: "Friend request sent successfully" });
    } catch (error) {
        console.error("Error in sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { to } = req.body;
        const currentUser = req.user;        

        const toUser = await User.findById(to);
        const me = await User.findById(currentUser._id);

        if (!toUser || !me) {
            return res.status(404).json({ message: "User not found" });
        }

        const exist1 = await FriendRequest.findOne({
            to:to,
            from:currentUser._id
        })

        const exist2 = await FriendRequest.findOne({
            from:to,
            to:currentUser._id
        })

        if(!exist1 && !exist2){
            return res.status(404).json({ message: "No Friend Request" });
        }

        await FriendRequest.findOneAndDelete({
            to: to,
            from: currentUser._id
        });

        await FriendRequest.findOneAndDelete({
            from: to,
            to: currentUser._id
        });

        if (!me.friends.includes(toUser._id)) {
            me.friends.push(toUser._id);
        }

        if (!toUser.friends.includes(me._id)) {
            toUser.friends.push(me._id);
        }

        await me.save();
        await toUser.save();

        const existingConversation = await Conversation.findOne({
            users: { $all: [to, currentUser._id], $size: 2 }
        });

        if (!existingConversation) {
            await Conversation.create({
                users: [to, currentUser._id],
                avatar: toUser.avatar
            });
        }

        return res.status(201).json({ message: "Friend request accepted, users are now friends" });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const declineFriendRequest = async (req, res) => {
    try {
        const { to } = req.body;  
        const currentUser = req.user;

        const exist1 = await FriendRequest.findOne({
            to:to,
            from:currentUser._id
        })

        const exist2 = await FriendRequest.findOne({
            from:to,
            to:currentUser._id
        })

        if(!exist1 && !exist2){
            return res.status(404).json({ message: "No Friend Request" });
        }

        const deletedRequest1 = await FriendRequest.findOneAndDelete({
            from: to,
            to: currentUser._id
        });

        const deletedRequest2 = await FriendRequest.findOneAndDelete({
            to: to,
            from: currentUser._id
        });

       
        const conversation = await Conversation.findOne({
            users: { $all: [to, currentUser._id], $size: 2 }
        });

        if (conversation) {
            await Message.deleteMany({ to: conversation._id });

            await Conversation.findByIdAndDelete(conversation._id);
        }

        return res.status(200).json({ message: "Friend request declined and conversation removed" });
    } catch (error) {
        console.error("Error declining friend request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllFriendRequest = async (req, res) => {
    try {
        const currentUser = req.user;

        const friendRequests = await FriendRequest.find({ to: currentUser._id })
            .populate('from', 'userName fullName avatar'); 

        return res.status(200).json({ friendRequests });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
