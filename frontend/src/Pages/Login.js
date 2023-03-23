import React from "react";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context";
import { loginService } from "../Service/webService";
import { useNavigate,Link, Route, Routes } from "react-router-dom";
import './PagesCSS/Login.css'

export default function Login() {
  let navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { loginContext, setLoginContext } = useContext(LoginContext);

  useEffect(() => {
    // console.log(account);
  }, [account]);
  useEffect(() => {
    // console.log(password);
  }, [password]);

  function login() {
    new Promise(function (resolve, reject) {
      resolve(loginService(account, password));
      reject();
    })
      .then((data) => {
        if (data.User_Name == account) {
          console.log("login ok")
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.User_Name);
          localStorage.setItem("admin", data.User_admin.toString());
          localStorage.setItem("userID", data.User_ID.toString());
          setLoginContext(data.User_admin.toString());
          console.log(loginContext)
          navigate('/member/Cart')
        } else {
          localStorage.clear();
          setLoginContext("");
          console.log(data);
          console.log(loginContext);
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
      });
  }
  return (
    <div className="loginBackground">
      <h1 className="loginLogo">Login</h1>
      <p>
      <input
        type="text"
        placeholder="Account"
        onChange={(e) => setAccount(e.currentTarget.value)}
      ></input>
      </p>
      <p>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      </p>
      <button className="loginButton" onClick={() => login()}>Submit</button>
      <button className="signupButton">Signup</button>
    </div>
  );
}
