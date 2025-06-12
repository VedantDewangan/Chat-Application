import jwt from "jsonwebtoken";

const SECRET_KEY = "vedant_secret_key";

export const assignToken = (user, res) => {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      avatar: user.avatar,
      friends: user.friends
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
