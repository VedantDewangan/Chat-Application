import React, { useState } from 'react'
import './Search.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import toast from 'react-hot-toast';
import axios from "axios"

export default function Search() {

  const { user } = useAuth();
  const [name, SetName] = useState("");
  const [users, SetUsers] = useState(null);


  const [loading1,SetLoading1] = useState(false);
  const [loading2,SetLoading2] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();
    if(loading1) return;
    if (name.length <= 2) {
      toast.error("Please Enter atleast 3 characters")
      return;
    }
    SetLoading1(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/user/search?name=${name}`, { withCredentials: true });
      console.log(data);
      SetUsers(data.users);
      SetLoading1(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!")
    }
    SetLoading1(false);
  }

  const sendRequest = async (id) => {
    if(loading2) return;
    SetLoading2(id);
    try {
      await axios.post("http://localhost:3000/api/friend/sendFriendRequest", {
        to: id
      }, { withCredentials: true })
      toast.success("Request Sent Successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    SetLoading2(null);
  }

  return (
    <div className="page">
      <Drawer />
      <div className='main'>
        <div className="details detail">
          <form className="search-con" onSubmit={searchUser}>
            <input type="text" required value={name} onChange={(e) => { SetName(e.target.value) }} placeholder='Search User' autoComplete='off' />
            <button type='submit'>{loading1?'Loading':'Search'}</button>
          </form>
          <div className="all-searched-user">
            {users ?
              users.length === 0 ?
                <p style={{ padding: "10px" }}>No User Found</p>
                :
                users.map((obj, i) => {
                  return <div key={i}>
                    <img src={obj.avatar} alt="" />
                    <div className='searched-name'>
                      <p>{obj.fullName}</p>
                      <p>{obj.userName}</p>
                    </div>
                    <button onClick={()=>{sendRequest(obj._id)}}>{loading2?loading2===obj._id?'Loading...':'Send Request':'Send Request'}</button>
                  </div>
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
