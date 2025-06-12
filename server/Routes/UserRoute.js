import express from "express";
import { signup, checkFullNameEmailUsername, logout, login, search, updatePassword, updateAvatar,getUser } from "../Controller/UserController.js";
import { isLogin } from "../utils/isLogin.js";

const UserRoute = express.Router();

UserRoute.post("/signup",signup);
UserRoute.post("/check",checkFullNameEmailUsername);
UserRoute.post("/login",login);
UserRoute.post("/logout",logout);
UserRoute.get("/search",isLogin,search);
UserRoute.put("/updatePassword",isLogin,updatePassword);
UserRoute.put("/updateAvatar",isLogin,updateAvatar);
UserRoute.get("/me",isLogin,getUser);

export default UserRoute;