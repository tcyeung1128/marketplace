import React from "react";
import { productsList } from "../Service/webService";
import { useState, useEffect, useContext } from "react";
import "../Pages/PagesCSS/Products.css";
import { Link, Route } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

export default function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return productsList();
      })
      .then((data) => {
        setProducts(data);
        console.log(products);
      });
  }, []);
  return (
    <div className="productDiv">
      <div className="productMainCard">
        {products?.map((product) => (
          <div key={product.Item_ID}>
            <div className="productCard">
              <img
                className="productImg"
                src={require("../Image/ProductImage/" + product.Item_Img_Url)}
                alt={product.Item_Name}
              ></img>
              <div className="productCardText">
                <h5 className="productName">{product.Item_Name}</h5>
                <h5 className="productPrice">${product.Item_Price}</h5>
              </div>
              {/* <Route path="/products/:name" component={<ProductDetail name={product.Item_Name} />} /> */}
              {/* <Link to={`/products/${product.Item_ID}`}> */}
              <Link to={"/products/" + product.Item_ID}>
                <button className="addToCartButton">
                  <img
                    className="imgProductsButton"
                    src={require("../Image/touchscreen.png")}
                    alt={product.Item_Name}
                  ></img>
                </button>
              </Link>
              {/* </Link> */}
              {/* <button className="buyButton">BUY</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
