import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    avatar:{
        required:true,
        type:String
    },
    lastMessage:{
        type:String,
        default:'Type "Hii" and start your conversation 😊'
    },
    type:{
        type:String,
        default:"Individual"
    },
    name:{
        type:String
    }
},{
    timestamps:true 
})

export const Conversation = mongoose.model("Conversation",ConversationSchema);