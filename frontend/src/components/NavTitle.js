import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context";
// import Home from "../Pages/Home";
// import Products from "../Pages/Products";
// import './componentsCSS/NavTitle.css';

export default function NavTitle() {
  let navigate = useNavigate();
  const { loginContext, setLoginContext } = useContext(LoginContext);
  const [logoutState, setLogoutState] = useState(false);
  // console.log(loginContext);
  // setLoginContext("pk")
  useEffect(() => {
    if (localStorage.getItem("admin") == "true") {
      setLoginContext("true");
      console.log("title", loginContext);
    } else if (localStorage.getItem("admin") == "false") {
      setLoginContext("false");
      console.log("title", loginContext);
    } else {
      setLoginContext("");
      localStorage.clear();
    }
  }, []);

  function logout() {
    localStorage.clear();
    setLoginContext("");
    setLogoutState(!logoutState);
    navigate("/login");
  }

  // useEffect(()=>{
  //   setLoginContext("");
  //   navigate('/login');
  // },[logoutState])
  return (
    <div>
      <Nav id="basic-navbar-nav" className="justify-content-center text-center">
        <img
          style={{
            width: "130px",
            zIndex: 2147483647,
            top: 0,
            position: "fixed",
          }}
          className="imgProductsButton"
          src={require("../Image/logo.png")}
          alt="logo"
        ></img>
      </Nav>
      <Navbar
        expand="lg"
        variant="dark"
        style={{ background: "#553939" }}
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            Cake Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="justify-content-end">
              <Nav.Link
                style={{ textAlign: "left" }}
                as={Link}
                to={"/products"}
              >
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/activity"}
                style={{ textAlign: "left" }}
              >
                New Activity
              </Nav.Link>
              {loginContext == "" && (
                <Nav.Link as={Link} to={"/login"} style={{ textAlign: "left" }}>
                  Login
                </Nav.Link>
              )}

              {loginContext == "true" && (
                <NavDropdown
                  title="Admin"
                  id="basic-nav-dropdown"
                  style={{ textAlign: "left" }}
                >
                  <NavDropdown.Item as={Link} to={"/member/changepassword"}>
                    Change password
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/member/cart"}>
                    Cart
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/member/order"}>
                    Order
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/404"}>
                    Set Activity
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/404"}>
                    Set Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/404"}>
                    Check Order
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {loginContext == "false" && (
                <NavDropdown
                  title="Member"
                  id="basic-nav-dropdown"
                  style={{ textAlign: "left" }}
                >
                  <NavDropdown.Item as={Link} to={"/member/changepassword"}>
                    Change password
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/member/cart"}>
                    Cart
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/member/order"}>
                    Order
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link style={{ textAlign: "left" }} as={Link} to={"/Contact"}>
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Link to={"/"}>v</Link> */}

      {/* <nav class="navbar">
        <div class="navbarContainer">
          <div class="navbarBrandBackground">
            <a class="navbarBrand" href="#home">
              Chung's Profolio
            </a>
          </div>
          <div class="navbarButtonContainer">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
          <ul class="navbarUl">
            <li>
              <a href="#aboutme">About me</a>
            </li>
            <li>
              <a href="#skill">Skill</a>
            </li>
            <li>
              <a href="#project">Project</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li class="navbarUlDropdown">
              <a href="#">Services</a>
              <ul class="navbarUlDropdownContent">
                <li>
                  <a href="#">Service 1</a>
                </li>
                <li>
                  <a href="#">Service 2</a>
                </li>
                <li>
                  <a href="#">Service 3</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav> */}

      {/* <div class="resNavbarOpen">
        <ul class="resNavbarUl">
          <li>
            <a href="#aboutme">About me</a>
          </li>
          <li>
            <a href="#skill">Skill</a>
          </li>
          <li>
            <a href="#project">Project</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li class="resNavbarUlDropdown">
            <a href="#">Services</a>
            <ul class="resNavbarUlDropdownContent">
              <li>
                <a href="#">Service 1</a>
              </li>
              <li>
                <a href="#">Service 2</a>
              </li>
              <li>
                <a href="#">Service 3</a>
              </li>
            </ul>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
