import React, { useState, useEffect } from 'react'
import './Request.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from "react-hot-toast";

export default function Request() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [requests, SetAllRequest] = useState([]);
    const [loading1,SetLoading1] = useState(null);
    const [loading2,SetLoading2] = useState(null);
    const [loading,Setloading] = useState(false);

    const getAllRequest = async () => {
        Setloading(true);
        try {
            const { data } = await axios.get("http://localhost:3000/api/friend/getAllFriendRequest", { withCredentials: true })
            console.log(data);
            SetAllRequest(data.friendRequests);
        } catch (error) {
            console.log(error);
        }
        Setloading(false);
    }

    useEffect(() => {
        getAllRequest();
    }, [])

    const acceptRequest = async (id) => {
        if(loading1) return ;
        if(loading2){
            if(loading2===id){
                return;
            }
        }
        SetLoading1(true);
        try {
            await axios.post("http://localhost:3000/api/friend/acceptFriendRequest", {
                to: id
            }, { withCredentials: true });

            SetAllRequest(prev => prev.filter(item => item.from._id !== id));
            toast.success("Friend request accepted!");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        SetLoading1(false);
    };

    const declineRequest = async (id) => {
        if(loading2) return ;
        if(loading1){
            if(loading1===id) return;
        }
        SetLoading2(true);
        try {
            await axios.post("http://localhost:3000/api/friend/declineFriendRequest", {
                to: id
            }, { withCredentials: true });

            SetAllRequest(prev => prev.filter(item => item.from._id !== id));
            toast.success("Friend request declined!");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        SetLoading2(false);
    };


    return (
        <div className="page">
            <Drawer />
            <div className='main'>
                <div className="details detail req">
                    {loading?
                    <p>Loading...</p>
                    :
                    requests.length === 0 ?
                        <p>No Request</p>
                        :
                        requests.map(obj => {
                            return <div key={obj._id} className='request-con'>
                                <img src={obj.from.avatar} alt="" />
                                <div>
                                    <p>{obj.from.fullName}</p>
                                    <p>{obj.from.userName}</p>
                                </div>
                                <div>
                                    <button onClick={() => { acceptRequest(obj.from._id) }} style={{
                                        opacity:`${loading1?loading1===obj.from._id?0.4:1:1}`
                                    }} >{loading1?loading1===obj.from._id?'Loading':'Accept':'Accept'}</button>
                                    <button onClick={() => { declineRequest(obj.from._id) }} style={{
                                        opacity:`${loading2?loading2===obj.from._id?0.4:1:1}`
                                    }}>{loading2?loading2===obj.from._id?'Loading':'Decline':'Decline'}</button></div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
