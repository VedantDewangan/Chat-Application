import React, { useEffect, useRef, useState } from 'react'
import './PersonalChat.css'
import Drawer from '../../components/Drawer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../../components/Header';
import { useAuth } from "../../AuthContext"
import { toast } from "react-hot-toast"
import socket from '../../socket';

export default function PersonalChat() {

    const navigate = useNavigate();
    const [laoding, Setloading] = useState(false);
    const { id } = useParams();
    const [conData, SetConData] = useState(null);
    const [otherUser, SetOtherUser] = useState(null);
    const { user } = useAuth();
    const [allMessage, SetAllMessage] = useState([]);
    const [loadingMessage, SetLoadingMessage] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: allMessage.length > 1 ? 'smooth' : 'auto' });
        }
    }, [allMessage]);

    useEffect(() => {
        if (id) {
            socket.emit("join-room", id);
        }

        socket.on("receive-message", (data) => {
            if (data.to === id && data.from._id!==user._id) {
                SetAllMessage((prev) => [...prev, data]);
                console.log(data);
            }
        });

        return () => {
            socket.off("receive-message");
        };
    }, [id]);


    const SendMessage = async (e) => {
        e.preventDefault();
        if (loadingMessage) return;
        SetLoadingMessage(true);
        try {
            const { data } = await axios.post("http://localhost:3000/api/message/sendMessage", {
                to: id,
                message: message
            }, { withCredentials: true });
            console.log(data);
            

            const response = await axios.get(`http://localhost:3000/api/message/getMessage?conversation=${id}`, { withCredentials: true });
            SetAllMessage(response.data.messages);
            socket.emit("send-message", {
                _id: data.data._id,
                message: message,
                to:id,
                from:{
                    _id:user._id,
                    userName:user.userName,
                    avatar:user.avatar
                }
            });
            SetMessage("");
        } catch (error) {
            console.log(error);
            toast.error("Please try again")
        }
        SetLoadingMessage(false)
    }

    const getDetails = async () => {
        Setloading(true);
        try {
            const { data } = await axios.get(`http://localhost:3000/api/message/getConversation/${id}`, { withCredentials: true });
            SetConData(data.con);
            if (data.con.type === "Individual") {
                const arr = data.con.users.filter(obj => { return user._id !== obj._id });
                SetOtherUser(arr);
            }
            const response = await axios.get(`http://localhost:3000/api/message/getMessage?conversation=${id}`, { withCredentials: true });
            SetAllMessage(response.data.messages)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        Setloading(false);
    }

    useEffect(() => {
        getDetails();
    }, [])

    const [message, SetMessage] = useState("");

    return (
        <div className="page">
            <Drawer />
            <div className='main main-2'>
                <div className="details detail detail-conver">
                    {laoding ?
                        <p style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</p>
                        :
                        <>
                            <Header
                                avatar={conData ? conData.type === "Individual" ? otherUser ? otherUser[0].avatar : "https://i.pinimg.com/1200x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg" : conData.avatar : "https://i.pinimg.com/1200x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg"}
                                name={conData ? conData.type === "Individual" ? otherUser ? otherUser[0].userName : "" : conData.name : ""}
                                type={conData?conData.type==="Individual"?0:1:0}
                                id={conData?conData._id:'1'}
                                />
                            <div className='all-messages-con'>
                                {allMessage.map(obj => {
                                    return <div key={obj._id} className={obj.from._id === user._id ? "sender" : 'reciver'}>
                                        <p>{obj.from._id === user._id ? "You" : obj.from.userName}</p>
                                        <p>{obj.message}</p>
                                    </div>
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className='chat-send'>
                                <form onSubmit={SendMessage}>
                                    <input type="text" value={message} onChange={(e) => { SetMessage(e.target.value) }} required placeholder='Enter the message' />
                                    <button type='submit'>{loadingMessage ? 'Sending...' : 'Send Message'}</button>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
