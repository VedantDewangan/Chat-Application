import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import image from "../../assets/group.png"
import socket from '../../socket';

export default function Chat() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [arr, SetArr] = useState([]);
  const [loading,SetLoading] = useState(false);

  const getAllConversation = async () => {
    SetLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/api/message/getAllConversation", {
        withCredentials: true
      });
      SetArr(data.conversations);
    } catch (error) {
      console.log(error);
    }
    SetLoading(false);
  }

  useEffect(() => {
    getAllConversation();
  }, []);

  return (
    <div className="page">
      <Drawer />
      <div className='main'>
        <div className="details chat-detail">
          {loading?
          <p>Loading...</p>
          :
          arr.map((obj) => {
            const otherUser = obj.users.find(u => u._id !== user._id);
            return (
              <div key={obj._id} className='each-chat' onClick={()=>{
                socket.emit("join-room", obj._id);
                navigate(`/chat/${obj._id}`)
              }} >
                <img src={obj.type === "Individual" ? otherUser?.avatar : image} alt="" />
                <div className='each-chat-text'>
                  <p>{obj.type === "Individual" ? otherUser?.userName : obj.name}</p>
                  <p>{obj.lastMessage.length>=25?obj.lastMessage.slice(0,25)+"...":obj.lastMessage}</p>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  )
}
