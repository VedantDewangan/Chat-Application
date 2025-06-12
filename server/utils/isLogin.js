import jwt from "jsonwebtoken";

const SECRET_KEY = "vedant_secret_key";

export const isLogin = (req, res, next) => {
  try {    
    const token = req.cookies?.token;    

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();

  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
