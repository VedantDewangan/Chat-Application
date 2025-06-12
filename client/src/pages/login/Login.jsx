import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import axios from 'axios'
import { useAuth } from '../../AuthContext'

export default function Login() {

  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const navigate = useNavigate();
  const [loading,SetLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(loading) return;
    SetLoading(true);
    try {
      const {data} = await axios.post("http://localhost:3000/api/user/login",{
        email:email,
        password:password
      },{withCredentials:true})
      console.log(data.user);
      setUser(data.user);
      toast.success("Login Successfully")
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    SetLoading(false);
  }

  return (
    <div className='login-page'>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
            <input type='email' autoComplete='off' value={email} onChange={(e)=>{
              SetEmail(e.target.value)
            }} required placeholder='Enter Email' />
            <input type='password' autoComplete='off' value={password} onChange={(e)=>{
              SetPassword(e.target.value)
            }} required placeholder='Enter Password' />
            <Link to={'/signup'}>Don't have account?</Link>
            <button type='submit' style={{
              opacity:`${loading?0.4:1}`
            }}>{loading?'Loading...':'Login'}</button>
        </form>
    </div>
  )
}
