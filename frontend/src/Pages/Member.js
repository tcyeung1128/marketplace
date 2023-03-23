import React from 'react'
import { useState, useEffect, useContext } from "react";
import { useNavigate,Link, Route, Routes } from "react-router-dom";

export default function Member() {
  let navigate = useNavigate();
  const [userName,setUserName]=useState(localStorage.getItem("user"));
  function changePassword(){
    navigate('/member/changepassword')
  }
  return (
    <div>
      <div>
        <h1>Welcome, {userName}</h1>
        <button onClick={()=>changePassword()}>Change password</button>
      </div>
    </div>
  )
}
