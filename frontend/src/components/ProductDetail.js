import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { productsDetail } from "../Service/webService";
import "./componentsCSS/ProductDetail.css";
import { LoginContext, CartContext } from "../context";
import { putaddCartQTY, getCartList } from "../Service/userService";

export default function ProductDetail() {
  let navigate = useNavigate();
  const { cartContext, setCartContext } = useContext(CartContext);
  const { loginContext, setLoginContext } = useContext(LoginContext);
  const [updataQty, setUpdataQty] = useState(false);
  let params = useParams();
  const [product, setProduct] = useState(null);
  const history = useNavigate();

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
  }, [updataQty]);

  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        console.log(params.Item_ID);
        return productsDetail(params.Item_ID);
      })
      .then((data) => {
        setProduct(data);
        console.log(product);
      });
  }, []);
  function addCartQTY(itemID) {
    // console.log(cartContext[0].User_ID);
    // console.log(itemID);
    // console.log(loginContext);
    if (loginContext) {
      new Promise(function (resolve, reject) {
        resolve(
          putaddCartQTY(
            localStorage.getItem("userID"),
            itemID,
            localStorage.getItem("token")
          )
        );
        reject();
      })
        .then(() => {
          setUpdataQty(!updataQty);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }
  console.log("loginContext", loginContext);
  return (
    <div>
      <div className="productDetailBG">
        {product ? (
          <div className="productDetailDiv">
            <div className="productDetailCard">
              <img
                className="productDetailImg"
                src={require("../Image/ProductImage/" +
                  product[0].Item_Img_Url)}
                alt={product[0].Item_Name}
              ></img>
              <h3 className="productDetailName">{product[0].Item_Name}</h3>
              <h6 className="productDetailDescription">
                {product[0].Item_Description}
              </h6>
              <div className="productDetailPrice">${product[0].Item_Price}</div>

              <button
                className="productDetailAddButton"
                onClick={() => addCartQTY(product[0].Item_ID)}
              >
                <img
                  className="shoppingcartImg"
                  src={require("../Image/shopping-cart.png")}
                ></img>
              </button>

              {cartContext?.map(
                (item) =>
                  item.Item_Name == product[0].Item_Name && (
                    <div className="productDetailQTY" key="marketplace_cartID">
                      Cart Qty: {item.Item_Qty}
                    </div>
                  )
              )}
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}

        <button className="productDetaiBackButton" onClick={() => history(-1)}>
          <img className="backImg" src={require("../Image/back.png")}></img>
        </button>
      </div>
    </div>
  );
}
