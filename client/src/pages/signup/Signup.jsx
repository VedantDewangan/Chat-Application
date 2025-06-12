import React, { useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../../AuthContext"

export default function Signup() {

    const [state, SetState] = useState("name");
    const [fullName, SetFullname] = useState("");
    const [userName, SetUserName] = useState("");
    const [email, SetEmail] = useState("");
    const [avatar, SetAvatar] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");
    const naviagte = useNavigate();
    const { setUser } = useAuth()

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

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        if(loading1) return;
        SetLoading1(true);
        try {
            await axios.post("http://localhost:3000/api/user/check",{
                fullName:fullName,
                userName:userName,
                email:email
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            return;
        }
        SetLoading1(false);
        SetState("avatar")
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();
        if(avatar===""){
            toast.error("Please Choose the avatar");
            return;
        }
        SetState("password")
    }

    const handleSubmit3 = async (e) => {
        e.preventDefault();
        if(loading2) return;
        SetLoading2(true);
        if(password.length<=5){
            toast.error("Please Enter the strong password")
            SetLoading2(false);
            return;
        }
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be same")
            SetLoading2(false);
            return;
        }
        try {
            const {data} = await axios.post("http://localhost:3000/api/user/signup",{
                fullName:fullName,
                userName:userName,
                email:email,
                password:password,
                avatar:avatar
            },{withCredentials:true})
            SetLoading2(false);            
            setUser(data.user);
            toast.success("Account Created Successfully");
            naviagte("/")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        SetLoading2(false);
    }

    const [loading1,SetLoading1] = useState(false);
    const [loading2,SetLoading2] = useState(false);

    return (
        <div className='login-page'>
            <p>SignUp</p>
            <form onSubmit={handleSubmit1} style={{ display: `${state === 'name' ? 'flex' : 'none'}` }} >
                <input type='text' required autoComplete='off' onChange={(e) => { SetFullname(e.target.value) }} value={fullName} placeholder='Enter FullName' />
                <input type='text' required autoComplete='off' onChange={(e) => { SetUserName(e.target.value) }} value={userName} placeholder='Enter UserName' />
                <input type='email' required autoComplete='off' onChange={(e) => { SetEmail(e.target.value) }} value={email} placeholder='Enter Email' />
                <Link to={'/login'}>Already have account?</Link>
                <button type='submit' style={{
                    opacity:`${loading1?0.4:1}`
                }}>{loading1?'Loading...':'Next'}</button>
            </form>

            <form onSubmit={handleSubmit2} style={{ display: state === 'avatar' ? 'flex' : 'none' }}>
                <p>Choose Avatar</p>
                <div className='avatar-options'>
                    {avatarOptions.map((obj, i) => (
                        <img
                            key={i}
                            src={obj}
                            alt=""
                            style={{
                                border: avatar === obj ? '1px solid rgb(165, 165, 165)' : '1px solid rgb(20, 20, 20)',
                            }}
                            onClick={() => SetAvatar(obj)}
                        />
                    ))}
                </div>
                <button type='submit'>Next</button>
            </form>

            <form onSubmit={handleSubmit3} style={{ display: `${state === 'password' ? 'flex' : 'none'}` }} >
                <input type='password' required autoComplete='off' value={password} onChange={(e) => {
                    SetPassword(e.target.value)
                }} placeholder='Choose Password' />
                <input type='password' required autoComplete='off' value={confirmPassword} onChange={(e) => {
                    SetConfirmPassword(e.target.value)
                }} placeholder='Confirm Password' />
                <button type='submit' style={{
                    opacity:`${loading2?0.4:1}`
                }}>{loading2?'Loading...':'Create Account'}</button>
            </form>

        </div>
    )
}
