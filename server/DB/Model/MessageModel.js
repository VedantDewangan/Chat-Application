import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    from:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    to:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    },
    message:{
        required:true,
        type:String
    }
},{
    timestamps:true 
})

export const Message = mongoose.model("Message",MessageSchema);