# Zing Chat – Real-Time Conversations Made Easy 💬

**Zing Chat** is a real-time chat application built with the robust **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **WebSockets** for live messaging. It offers seamless 1-on-1 and group chat capabilities, friend management, and user authentication — all wrapped in a modern, interactive UI.

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [Test Zing Chat](#test-zing-chat)  

---

## Features

- 🔐 **User Authentication**: Sign Up, Login, Secure Logout  
- 👤 **Profile Management**: Update avatar and change password  
- 📧 **User Info Privacy**: Email and password remain private; avatar, full name, and username are public  
- 🔎 **Friend Search & Requests**: Search for users, send/receive friend requests  
- ✅ **Friend Request Handling**: Accept or decline requests easily  
- 💬 **Real-Time Chat**: 1-on-1 and group chat functionality using WebSocket  
- 👥 **Group Chats**: Create and chat with multiple friends in real-time  

---

## Installation

To run Zing Chat locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VedantDewangan/Chat-Application.git
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**:

   In the `server` folder, create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_uri
   ```

5. **Start the development servers**:

   - Server:
     ```bash
     node server.js
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

---

## Usage

1. Visit `http://localhost:5173` or your deployed URL.
2. Register or log in to your account.
3. Explore the menu and add food items to your cart or wishlist.
4. Place your order using Paypal.
5. Track your order status in the **Orders** section.

---

## Screenshots

### 📝 Sign Up Page  
![SignUp Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(59).png)

### 🔐 Login Page  
![Login Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(60).png)

### 🏠 Home Page  
![Home Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(61).png)

### 🔑 Update Password  
![Update Password](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(62).png)

### 🔍 Search Users  
![Search User](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(63).png)

### 🤝 Friend Requests  
![Friend Request](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(64).png)

### 💬 Chat Page  
![Chat Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(65).png)

### 🧑‍🤝‍🧑 Personal Chat  
![Personal Chat Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(67).png)

### ➕ Create Group  
![Create Group](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(68).png)

### 👥 Group Chat Page  
![Group Chat Page](https://github.com/VedantDewangan/Chat-Application/blob/main/Screenshot%20(69).png)

---

## Contributing

Contributions are welcome and appreciated!

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request.

---

## Test Zaykaa

Check out the live demo: [ZingChat on Netlify](https://zingchat.netlify.app/)

---
