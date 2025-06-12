import React, { useState, useEffect } from 'react'
import './GroupDetails.css'
import { useAuth } from '../../AuthContext'
import Drawer from '../../components/Drawer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import img from "../../assets/group.png"

export default function GroupDetails() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [obj, SetObj] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getConverstionDetail = async () => {
            Setloading(true);
            try {
                const { data } = await axios.get(`http://localhost:3000/api/message/getConversation/${id}`, { withCredentials: true });
                SetObj(data.con);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
            Setloading(false);
        }
        getConverstionDetail();
    }, [])

    const [laoding, Setloading] = useState(false);

    return (
        <div className="page">
            <Drawer />
            <div className='main'>
                <div className="details group-detail">
                    {laoding ?
                        <p>Loading...</p>
                        :
                        obj ?
                            <>
                                <span className="material-symbols-outlined group-detail-span" onClick={() => {
                                    navigate(`/chat/${id}`);
                                }}>arrow_back</span>
                                <img src={img} alt="" className='group-details-img' />
                                <p className='group-details-p'>Users</p>
                                <div>
                                    {obj.users.map(u => {
                                        return <div className='group-details-div' >
                                            <img src={u.avatar} alt="" />
                                            <p>{u.userName}</p>
                                        </div>
                                    })}
                                </div>
                            </>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}