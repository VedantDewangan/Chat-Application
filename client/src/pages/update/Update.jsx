import React, { useState } from 'react'
import './Update.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast} from "react-hot-toast"

export default function Update() {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [avatar, SetAvatar] = useState("");
    const [newPassword,SetNewPassword] = useState("");
    const [oldPassword1,SetOldPassword1] = useState("");
    const [oldPassword2,SetOldPassword2] = useState("");

    const avatarOptions = [
        'https://avatar.iran.liara.run/public/3',
        'https://avatar.iran.liara.run/public/36',
        'https://avatar.iran.liara.run/public/41',
        'https://avatar.iran.liara.run/public/38',
        'https://avatar.iran.liara.run/public/40',
        'https://avatar.iran.liara.run/public/37',
        'https://avatar.iran.liara.run/public/98',
        'https://avatar.iran.liara.run/public/100',
        'https://avatar.iran.liara.run/public/73',
        'https://avatar.iran.liara.run/public/97',
        'https://avatar.iran.liara.run/public/96',
        'https://avatar.iran.liara.run/public/99'
    ]

    const [loading1,SetLoading1] = useState(false);
    const [loading2,SetLoading2] = useState(false);

    const updatePassword = async (e)=>{
        e.preventDefault();
        if(loading1) return;
        if(newPassword.length()<=5){
            toast.error("Please choose the strong password !!");
            return;
        }
        SetLoading1(true);
        try {
            await axios.put("http://localhost:3000/api/user/updatePassword",{
                oldPassword:oldPassword1,
                newPassword:newPassword
            },{withCredentials:true
            })
            toast.success("Password Updated Successfully")
            SetNewPassword("");
            SetOldPassword1("");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        SetLoading1(false);
    }

    const updateAvatar = async (e)=>{
        e.preventDefault();
        if(loading2) return;
        if(avatar==="") {
            toast.error("Please choose avatar");
        }
        SetLoading2(true);
        try {
            await axios.put("http://localhost:3000/api/user/updateAvatar",{
                oldPassword:oldPassword2,
                avatar:avatar
            },{withCredentials:true
            })
            const obj = {...user,avatar:avatar};
            setUser(obj);
            toast.success("Avatar Updated Successfully")
            SetAvatar("");
            SetOldPassword2("");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        SetLoading2(false);
    }

    return (
        <div className="page">
            <Drawer />
            <div className='main'>
                <div className="details update-detail">
                    <div className='update-form-div'>
                        <form className='update-form' onSubmit={updatePassword}>
                            <p>Update Password</p>
                            <input type="password" value={newPassword} onChange={(e)=>{SetNewPassword(e.target.value)}}  required placeholder='Enter new Passowrd' />
                            <input type="password" value={oldPassword1} onChange={(e)=>{SetOldPassword1(e.target.value)}} required placeholder='Enter old Password' />
                            <button type='submit' style={{
                            opacity:`${loading1?0.4:1}`
                        }}>{loading1?'Loading...':'Update Password'}</button>
                        </form>
                    </div>
                    <form className='update-form' onSubmit={updateAvatar} >
                        <p>Update Avatar</p>
                        <div className='avatar-options for-update'>
                            {avatarOptions.map((obj, i) => (
                                <img
                                    key={i}
                                    src={obj}
                                    alt=""
                                    style={{
                                        border: avatar === obj ? '1px solid rgb(165, 165, 165)' : '1px solid rgb(50, 50, 50)',
                                    }}
                                    onClick={() => SetAvatar(obj)}
                                />
                            ))}
                        </div>
                        <input type="password" required value={oldPassword2} onChange={(e)=>{SetOldPassword2(e.target.value)}} placeholder='Enter old Password' />
                        <button type='submit' style={{
                            opacity:`${loading2?0.4:1}`
                        }}>{loading2?'Loading...':'Update Avatar'}</button>
                    </form>
                    <div className='update-back-but'>
                        <button onClick={()=>{
                            navigate("/")
                        }}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
