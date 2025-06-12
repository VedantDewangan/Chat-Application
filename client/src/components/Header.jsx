import React from 'react'
import "./Component.css"
import { useNavigate } from 'react-router-dom'
import img from "../assets/group.png"

export default function Header({ avatar, name, type, id }) {

  const navigate = useNavigate();

  return (
    <div className='chat-header' >
      <span className="material-symbols-outlined" onClick={() => {
        navigate("/chats");
      }}>arrow_back</span>
      <img src={avatar === "../../assets/group.png" ? img : avatar} alt="" onClick={() => {
        if (type) {
          navigate(`/group/${id}`)
        }
      }} />
      <p onClick={() => {
        if (type) {
          navigate(`/group/${id}`)
        }
      }}>{name}</p>
    </div>
  )
}
