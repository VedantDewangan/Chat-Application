import React, { useState ,useEffect} from 'react'
import './Home.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import socket from '../../socket';

export default function Home() {
  const { user,setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    if(laoding) return;
    Setloading(true);
    await axios.post("http://localhost:3000/api/user/logout",{},{withCredentials:true});
    setUser(null)
    Setloading(false);
    navigate("/login")
  }
  socket.connect();

  const [laoding,Setloading] = useState(false);

  return (
    <div className="page">
      <Drawer />
      <div className='main'>
        <div className="details">
          <div className='details-1'>
            <img src={user.avatar} alt="" />
            <div><p>Fullname : </p><p>{user.fullName}</p></div>
            <div><p>Username : </p><p>{user.userName}</p></div>
          </div>
          <div className='details-2'>
            <button onClick={()=>{
              navigate("/update")
            }}>Edit Profile</button>
            <button onClick={handleLogout} style={{
              opacity:`${laoding?0.4:1}`
            }}>{laoding?'Loading...':'Logout'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
