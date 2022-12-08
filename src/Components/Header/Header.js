import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { FirebaseContext, AuthContext } from "../../context/authContext";

function Header() {
  const navigate = useHistory();

  const { Firebase } = useContext(FirebaseContext);
  const logoutButtonHandler = (e) => {
    console.log("logout button working");
    Firebase.auth()
      .signOut()
      .then(() => {
        navigate.push("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        alert(error.massage);
        // An error happened.
      });
  };
  const { loginStuatus } = useContext(AuthContext);
  const sellButtonHandeler = (e) => {
    navigate.push("/sell");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {loginStuatus ? (
            <span> {loginStuatus.displayName} </span>
          ) : (
            <Link to="login">Login</Link>
          )}
          <hr />
        </div>
        {loginStuatus && <button onClick={logoutButtonHandler}>Logout</button>}

        <div className="sellMenu" onClick={sellButtonHandeler}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
