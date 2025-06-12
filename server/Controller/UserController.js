import { User } from "../DB/Model/UserModel.js";
import { assignToken } from "../utils/assignToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {        
        const { fullName, userName, avatar, password, email } = req.body;

        const userAlreadyExist1 = await User.findOne({ email });
        if (userAlreadyExist1) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password should contain atleast 6 characters" });
        }

        const userAlreadyExist2 = await User.findOne({ userName });
        if (userAlreadyExist2) {
            return res.status(400).json({ message: "Username not available" });
        }

        if (userName.length <= 5) {
            return res.status(400).json({ message: "Username should contain atleast 6 characters" });
        }

        if (fullName.length <= 2) {
            return res.status(400).json({ message: "Please Enter the vail Username" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullName,
            userName,
            avatar,
            password: hashedPassword,
            email,
        });

        await newUser.save();

        assignToken(newUser, res);

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Signup failed" });
    }
};

export const checkFullNameEmailUsername = async (req, res) => {
    try {

        const { fullName, userName, email } = req.body;

        if (!fullName || !userName || !email) {
            return res.status(400).json({ message: "Please Enter FullName, UserName, Email" });
        }

        const userAlreadyExist1 = await User.findOne({ email });
        if (userAlreadyExist1) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const userAlreadyExist2 = await User.findOne({ userName });
        if (userAlreadyExist2) {
            return res.status(400).json({ message: "Username not available" });
        }

        if (userName.length <= 5) {
            return res.status(400).json({ message: "Username should contain atleast 6 characters" });
        }

        if (fullName.length <= 2) {
            return res.status(400).json({ message: "Please Enter the vail Username" });
        }

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("Checking name/email error:", error);
        res.status(500).json({ message: "Checking failed" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ message: "Please Enter the email and password" })
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "User with this email not exist" });
        }

        const check = await bcrypt.compare(password, userExist.password);
        if (!check) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        assignToken(userExist, res);

        res.status(200).json({ message: "User login successfully", user: userExist });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Login Failed" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
}

export const search = async (req, res) => {
   try {
    const { name } = req.query;
    const currentUser = req.user;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const me = await User.findById(currentUser._id);

    let users = await User.find({
      $or: [
        { userName: { $regex: name, $options: "i" } },
        { fullName: { $regex: name, $options: "i" } },
      ]
    }).select("-password");

    users = users.filter((user) => {
      return (
        user._id.toString() !== currentUser._id.toString() &&
        !me.friends.includes(user._id)
      );
    });

    res.status(200).json({ users });
    } catch (error) {
        console.error("Search User error:", error);
        res.status(500).json({ message: "Search User failed" });
    }
}

export const updateAvatar = async (req, res) => {
  try {
    const { oldPassword, avatar } = req.body;
    const currentUser = req.user;

    const me = await User.findById(currentUser._id);

    const isPasswordCorrect = await bcrypt.compare(oldPassword, me.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    me.avatar = avatar;
    await me.save();

    res.status(200).json({ message: "Avatar updated successfully", user: me });

  } catch (error) {
    console.error("updateAvatar error:", error);
    res.status(500).json({ message: "Avatar update failed" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentUser = req.user;

    const me = await User.findById(currentUser._id);

    const isPasswordCorrect = await bcrypt.compare(oldPassword, me.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    me.password = hashedPassword;
    await me.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("updatePassword error:", error);
    res.status(500).json({ message: "Password update failed" });
  }
};

export const getUser = async (req,res)=>{
    try {
        const user = req.user;
        const currentUser = await User.findById(user._id).populate("friends","userName avatar");
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error in me"})
    }
}