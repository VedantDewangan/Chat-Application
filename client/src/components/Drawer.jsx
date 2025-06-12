import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Component.css';
import axios from 'axios';

export default function Drawer() {
    const [open, setOpen] = useState(false);
    const [req,SetReq] = useState([]);

    useEffect(()=>{
    const getRequest = async ()=>{
      const {data} = await axios.get("http://localhost:3000/api/friend/getAllFriendRequest",{withCredentials:true});
      SetReq(data.friendRequests)
    }
    getRequest();
  })

    return (
        <div className='menu'>
            <span
                style={{ display: !open ? 'block' : 'none', padding: '20px' }}
                className={`${req.length===0?"material-symbols-outlined":"material-symbols-outlined drawer"}`}
                onClick={() => setOpen(true)}
            >
                menu
            </span>

            <div className={`drawer-container ${open ? 'open' : ''}`}>
                <span className="material-symbols-outlined close-btn" onClick={() => setOpen(false)}>
                    close
                </span>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/request">Request {req.length===0?null:<span>{`(${req.length})`}</span>}</Link>
                <Link to="/chats">Chats</Link>
                <Link to="/create/group">Create Group</Link>
            </div>
        </div>
    );
}
