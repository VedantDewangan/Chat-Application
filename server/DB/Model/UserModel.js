import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    friends:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User",UserSchema);