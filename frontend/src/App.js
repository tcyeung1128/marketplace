import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { CartContext, ActivityContext, LoginContext } from "./context";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavTitle from "./components/NavTitle";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ErrorPage from "./Pages/ErrorPage";
import Bottom from "./components/Bottom";
import ProductDetail from "./components/ProductDetail";
import Activity from "./Pages/Activity";
import ActivityDetail from "./components/ActivityDetail";
import Login from "./Pages/Login";
import Member from "./Pages/Member";
import ChangePassword from "./Pages/ChangePassword";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";

function App() {
  const [cartContext, setCartContext] = useState([]);
  const [activityContext, setActivityContext] = useState([]);
  const [loginContext, setLoginContext] = useState("");
  const [state, setState] = useState("initialState");
  return (
    <div className="App">
      <LoginContext.Provider value={{ loginContext, setLoginContext }}>
        <CartContext.Provider value={{ cartContext, setCartContext }}>
          <ActivityContext.Provider
            value={{ activityContext, setActivityContext }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:Item_ID" element={<ProductDetail />} />
              <Route path="/activity" element={<Activity />} />
              <Route
                path="/activity/:activity_ID"
                element={<ActivityDetail />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/member" element={<Member />} />
              <Route
                path="/member/changepassword"
                element={<ChangePassword />}
              />
              <Route path="/member/cart" element={<Cart />} />
              <Route path="/member/order" element={<Order />} />

              <Route component={<ErrorPage />} />
            </Routes>
          </ActivityContext.Provider>
        </CartContext.Provider>
        <NavTitle />
        <Bottom />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
