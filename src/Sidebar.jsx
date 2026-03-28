import React from 'react'
import {  useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate=useNavigate()
  return (
    <div className='m-3 position-fixed'>
      <img className='logo-text my-3' src="src/assets/text.png" alt="img"/>
    <div className='d-flex flex-column gap-4 ms-2 sidebar m-3 position-fixed'>
      <div className="profile"><i className="bi bi-house-door-fill"></i><span className="label">Home</span></div>
      <div className="profile"><i className="bi bi-search"></i><span className="label">Search</span></div>
      <div className="profile"><i className="bi bi-compass"></i><span className="label">Explore</span></div>
      <div className="profile"><i className="bi bi-play-btn"></i><span className="label">Reels</span></div>
      <div className="profile"><i className="bi bi-chat-dots"></i><span className="label">Message</span></div>
      <div className="profile"><i className="bi bi-heart"></i><span className="label">Notification</span></div>
      <div className="profile"><i className="bi bi-plus-square"></i><span className="label">Create</span></div>
      <div className="profile" onClick={()=>{navigate("/profile")}}><i className="bi bi-person-circle "></i><span className="label">Profile</span></div>
    </div>
    <div  className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>More</div>
    </div>
    </div>
  )
}

export default Sidebar
