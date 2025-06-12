import express from "express";
import { isLogin } from "../utils/isLogin.js";
import { acceptFriendRequest, declineFriendRequest, getAllFriendRequest, sendFriendRequest,  } from "../Controller/FriendRequestController.js";

const FriendRequestRouter = express.Router();

FriendRequestRouter.post("/sendFriendRequest",isLogin,sendFriendRequest);
FriendRequestRouter.post("/acceptFriendRequest",isLogin,acceptFriendRequest);
FriendRequestRouter.post("/declineFriendRequest",isLogin,declineFriendRequest);
FriendRequestRouter.get("/getAllFriendRequest",isLogin,getAllFriendRequest);

export default FriendRequestRouter;