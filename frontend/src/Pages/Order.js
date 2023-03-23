import React from "react";
import { useState, useEffect, useContext } from "react";
import { getOrderList } from "../Service/userService";
import './PagesCSS/Order.css'

export default function Order() {
  const [orderList, setOrderList] = useState();
  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve(
        getOrderList(
          localStorage.getItem("userID"),
          localStorage.getItem("token")
        )
      );
      reject();
    }).then((data) => {
      setOrderList(data);
      console.log(orderList);
    });
  }, []);
  return (
    <div className="orderBackground">
      <div  className="orderBackground2">
      {orderList?.map((order) => (
        <div key={order.Order_ID} className="cardBackground">
          
          <div className="orderCardL">
          <img
          className="orderItemImg"
            src={require("../Image/ProductImage/" + order.Item_Img_Url)}
            alt={order.Item_Name}
          >
          </img>
          </div>
          <div className="orderCardR">
          {/* <h5>Order ID: {order.Order_ID}</h5> */}
          <h5>{order.Item_Name}</h5>
          <h5>${order.Item_Price}</h5>
          <h5>{order.Item_Qty} Qty</h5>
          <h5>Total Price: {order.Item_TotalPrice}</h5>
          </div>
        </div>
        
      ))}
      </div>
    </div>
  );
}
