import React, { useState, useEffect } from 'react'
import './Group.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast} from "react-hot-toast"
import socket from '../../socket';

export default function Group() {
    const { user} = useAuth();
    const [friends, SetFriends] = useState([]);
    const [addedFriend,SetAddedFriend] = useState([]);
    const [grpName,SetGrpName] = useState("");


    useEffect(() => {
        const FriendList = async () => {
            SetFriends(user.friends)
        }
        FriendList();
    }, [])

    const createGroup = async ()=>{
        try {
            if(!grpName){
                toast.error("Please enter the group name");
                return;
            }
            if(grpName.length<=2){
                toast.error("Group Name should contain atleast 3 characters");
                return;
            }
            if(addedFriend.length<=1){
                toast.error("Please Select atleast 2 friends");
                return;
            }

            const arr = addedFriend.map(obj=>obj._id);
            console.log(arr);
            
            await axios.post("http://localhost:3000/api/message/createGroup",{
                name:grpName,
                users:[...arr,user._id]
            },{withCredentials:true});
            toast.success("Group Created Successfully");
            SetGrpName("");
            SetAddedFriend([]);
            SetFriends(user.friends);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!")
        }
    }


    return (
        <div className="page">
            <Drawer />
            <div className='main'>
                <div className="details">
                    <div className='input-name'>
                        <label>Enter the Group Name</label>
                        <input type="text" value={grpName} onChange={(e)=>{SetGrpName(e.target.value)}} placeholder='Enter the group name'/>
                    </div>
                    <div className='add-remove-con'>
                        <div className='add-con'>
                            <p>Add Friend To Your Group</p>
                            {friends.map(obj => {
                                return <div key={obj._id} onClick={()=>{
                                    const arr1 = friends.filter(item=>item._id!=obj._id);
                                    SetFriends(arr1);
                                    const arr2 = [...addedFriend,obj];
                                    SetAddedFriend(arr2);
                                }}>
                                    <img src={obj.avatar} alt="" />
                                    <p>{obj.userName}</p>
                                </div>
                            })}
                        </div>
                        <div className='remove-but'>
                            <p>Remove from Group</p>
                            {addedFriend.map(obj => {
                                return <div key={obj._id} onClick={()=>{
                                    const arr1 = addedFriend.filter(item=>item._id!=obj._id);
                                    SetAddedFriend(arr1);
                                    const arr2 = [...friends,obj];
                                    SetFriends(arr2);
                                }}>
                                    <img src={obj.avatar} alt="" />
                                    <p>{obj.userName}</p>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='but-create'>
                        <button onClick={createGroup}>Create Group</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
