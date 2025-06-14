import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true 
})

export const FriendRequest = mongoose.model("FriendRequest",FriendRequestSchema);