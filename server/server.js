import express from "express";
import { ConnectionDB } from "./DB/Connection/Connection.js";
import UserRoute from "./Routes/UserRoute.js";
import cookieParser from "cookie-parser";
import FriendRequestRouter from "./Routes/FriendRequest.js";
import MessageRoute from "./Routes/MessageRoute.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://zingchat.netlify.app"
];

// CORS for HTTP routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for socket origin"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/user', UserRoute);
app.use('/api/friend', FriendRequestRouter);
app.use('/api/message', MessageRoute);

// WebSocket Events
io.on("connection", (socket) => {
  socket.on("join-room", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("send-message", (data) => {
    const { _id, message, to, from } = data;
    io.to(to).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected");
  });
});

// Connect to DB and start server
ConnectionDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
  });
}, (err) => {
  console.log(err);
});
