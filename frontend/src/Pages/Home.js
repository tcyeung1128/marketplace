import "./PagesCSS/Home.css";
import { Link } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <div>
      <div className="homeBackground">
        <Link to="/products">
          <button className={"shopNowBackground"}>
            <h3 className="shopNowText">SHOP NOW!!</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}
