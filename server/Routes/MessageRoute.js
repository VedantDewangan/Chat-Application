import express from "express";
import { isLogin } from "../utils/isLogin.js";
import { getAllMessage, sendMessage ,getAllConversation,getConversation, createGroup} from "../Controller/MessageController.js";

const MessageRoute = express.Router();

MessageRoute.get("/getMessage",isLogin,getAllMessage);
MessageRoute.post("/sendMessage",isLogin,sendMessage);
MessageRoute.get("/getAllConversation",isLogin,getAllConversation);
MessageRoute.get("/getConversation/:id",isLogin,getConversation);
MessageRoute.post("/createGroup",isLogin,createGroup);

export default MessageRoute;