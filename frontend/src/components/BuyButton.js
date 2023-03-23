import React from "react";
import "./componentsCSS/BuyButton.css";
import { useState, useEffect, useContext } from "react";
import { buyButtonFromCart } from "../Service/userService";
import { useNavigate } from "react-router-dom";

export default function BuyButton() {
  let navigate = useNavigate();
  function buyfromCart() {
    buyButtonFromCart(
      localStorage.getItem("userID"),
      localStorage.getItem("token")
    );
    navigate("/member/order");
  }
  return (
    <div>
      <div className="buyButtonDiv">
        <button className="buyButton" onClick={() => buyfromCart()}>
          <img className="buyImg" src={require("../Image/buy.png")}></img>
        </button>
      </div>
    </div>
  );
}
