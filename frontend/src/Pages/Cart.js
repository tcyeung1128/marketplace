import React from "react";
import { CartContext, LoginContext } from "../context";
import { useState, useEffect, useContext } from "react";
import { getCartList } from "../Service/userService";
import "./PagesCSS/Cart.css";
import { putChangeCartQTY, delCartcartID } from "../Service/userService";
import BuyButton from "../components/BuyButton";

export default function Cart() {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { loginContext, setLoginContext } = useContext(LoginContext);
  const [checkInput, setCheckInput] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve(
        getCartList(localStorage.getItem("user"), localStorage.getItem("token"))
      );
      reject();
    })
      .then((data) => {
        setCartContext(data);
        return data;
      })
      .then((data) => console.log(cartContext));
  }, [checkInput]);

  useEffect(() => {
    if (cartContext) {
      let total = 0;
      for (let i = 0; i < cartContext.length; i++) {
        total = total + cartContext[i].Item_Price * cartContext[i].Item_Qty;
      }
      console.log(total);
      setTotalPrice(total);
    }
  }, [cartContext]);

  function changeCartQTY(value, qty, cartID) {
    console.log("value", value);
    console.log("qty", qty);
    console.log("cartID", cartID);
    if (value > 0) {
      return new Promise(function (resolve, reject) {
        resolve(putChangeCartQTY(value, cartID, localStorage.getItem("token")));
        reject();
      }).then((data) => {
        console.log(data);
        setCheckInput(!checkInput);
      });
    } else if (value == 0) {
      console.log("value is 0");
      return new Promise(function (resolve, reject) {
        resolve(delCartcartID(cartID, localStorage.getItem("token")));
        reject();
      }).then((data) => {
        console.log(data);
        setCheckInput(!checkInput);
      });
    } else {
      console.log(value);
      console.log("no");
    }
  }
  console.log(JSON.stringify(cartContext.length));
  return (
    <div className="cartBackground">
      {loginContext ? (
        <div>
          {cartContext?.map((cartItem) => (
            <div className="cartBackground2" key={cartItem.Cart_ID}>
              <div className="cartCard">
                <div className="cartCardL">
                  <img
                    className="cartImg"
                    src={require("../Image/ProductImage/" +
                      cartItem.Item_Img_Url)}
                    alt={cartItem.Item_Img_Url}
                  ></img>
                </div>
                <div className="cartCardR">
                  <div className="itemTextDiv">
                    <h5 className="itemText">{cartItem.Item_Name}</h5>
                  </div>
                  <div className="itemTextDiv">
                    <h5 className="itemText">
                      ${Math.trunc(cartItem.Item_Price)}
                    </h5>
                  </div>
                  <div>
                    <button
                      className="addAndMinusButton"
                      onClick={() =>
                        changeCartQTY(
                          Math.trunc(cartItem.Item_Qty) + 1,
                          Math.trunc(cartItem.Item_Qty),
                          cartItem.Cart_ID
                        )
                      }
                    >
                      <img
                        className="addImg"
                        src={require("../Image/add.png")}
                      ></img>
                    </button>
                    <input
                      size="2"
                      key={cartItem.Item_Qty}
                      defaultValue={Math.trunc(cartItem.Item_Qty)}
                      onBlur={(e) =>
                        changeCartQTY(
                          e.currentTarget.value,
                          Math.trunc(cartItem.Item_Qty),
                          cartItem.Cart_ID
                        )
                      }
                    ></input>
                    <button
                      className="addAndMinusButton"
                      onClick={() =>
                        changeCartQTY(
                          Math.trunc(cartItem.Item_Qty) - 1,
                          Math.trunc(cartItem.Item_Qty),
                          cartItem.Cart_ID
                        )
                      }
                    >
                      <img
                        className="minusImg"
                        src={require("../Image/minus.png")}
                      ></img>
                    </button>
                  </div>
                  <div className="itemTextDiv">
                    <h5 className="itemText">
                      Item total ${cartItem.Item_Price * cartItem.Item_Qty}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {JSON.stringify(cartContext.length) > 0 ? (
            <div className="cartBottonground">
              <div className="totalTextDiv">
                <h1 className="totalText">Total Price:{totalPrice}</h1>
              </div>
              <BuyButton />
            </div>
          ) : (
            <div className="itemTextDiv">
              <h1 className="itemText">No cart items</h1>
            </div>
          )}
        </div>
      ) : (
        <h1>Please Login</h1>
      )}
    </div>
  );
}
