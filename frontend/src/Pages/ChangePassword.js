import React from "react";
import { useState, useEffect, useContext } from "react";
import { changePassword } from "../Service/userService";
import "./PagesCSS/ChangePassword.css";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  function changePasswordButton() {
    console.log(oldPassword);
    console.log(newPassword);
    console.log(newPassword2);
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("token"));
    if (newPassword == newPassword2) {
      return new Promise(function (resolve, reject) {
        resolve(
          changePassword(
            localStorage.getItem("user"),
            oldPassword,
            newPassword,
            localStorage.getItem("token")
          )
        );
        reject();
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("pw1!=pw2");
    }
  }

  return (
    <div className="changePasswordBackGround">
      <p>
        <h1 className="changePasswordLogo">
          Change Password
        </h1>
      </p>
      <p>
        <input
          type="password"
          placeholder="Old password"
          onChange={(e) => setOldPassword(e.currentTarget.value)}
        ></input>
      </p>
      <p>
        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setNewPassword(e.currentTarget.value)}
        ></input>
      </p>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setNewPassword2(e.currentTarget.value)}
      ></input>
      <p>
        <button className="changePasswordButton" onClick={() => changePasswordButton()}>Submit</button>
      </p>
    </div>
  );
}
