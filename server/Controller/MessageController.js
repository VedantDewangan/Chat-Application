import {Conversation} from "../DB/Model/ConversationModel.js"
import {Message} from "../DB/Model/MessageModel.js"
import mongoose from "mongoose";

export const getAllMessage = async (req, res) => {
    try {
        const { conversation } = req.query;

        if (!mongoose.Types.ObjectId.isValid(conversation)) {
            return res.status(400).json({ message: "Invalid conversation ID" });
        }

        const conversationExist = await Conversation.findById(conversation);
        if (!conversationExist) {
            return res.status(404).json({ message: "This chat is not found" });
        }

        const allMessage = await Message.find({
            to: conversation
        }).populate("from", "userName avatar");

        return res.status(200).json({ messages: allMessage });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Failed to get messages" });
    }
};

export const sendMessage = async (req,res)=>{
    try {
        const {message,to} = req.body;
        const currentUser = req.user;

         if (!mongoose.Types.ObjectId.isValid(to)) {
            return res.status(400).json({ message: "Invalid conversation ID" });
        }

        const conversationExist = await Conversation.findById(to);
        if (!conversationExist) {
            return res.status(404).json({ message: "This chat is not found" });
        }
        
        const newMessage = await Message.create({
            from: currentUser._id,
            to: to,
            message: message
        });

        await Conversation.findOneAndUpdate({_id:to},{lastMessage:message})

        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to send Message"})
    }
}

export const getAllConversation = async (req, res) => {
    try {
        const currentUser = req.user;

        const conversations = await Conversation.find({
            users: { $in: [currentUser._id] }
        }).populate("users","userName avatar").sort({ updatedAt: -1 });

        return res.status(200).json({ conversations });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get conversations" });
    }
};

export const getConversation = async (req,res)=>{
    try {
        const {id} = req.params;
        const con = await Conversation.findById(id).populate("users","userName avatar");
        res.status(200).json({con});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get conversations" });
    }
}

export const createGroup = async (req,res)=>{
    try {
        const {name,users} = req.body;

        const con = await Conversation.create({
            users:users,
            avatar:"../../assets/group.png",
            type:"Group",
            name:name
        })
        return res.status(201).json({con});
    } catch (error) {  
        console.log(error);
        return res.status(500).json({ message: "Failed to create Group" });
    }
}