import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../olx-logo.png";

import "./Login.css";

function Login() {
  const navigate = useHistory();
  const { Firebase } = useContext(FirebaseContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const EamilEntryHandler = (e) => {
    setUserEmail(e.target.value);
  };
  const passwordEntryHandler = (e) => {
    setUserPassword(e.target.value);
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userEmail, userPassword);
    Firebase.auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        alert("loged in");
        navigate.push("/");
      })
      .catch((error) => {
        alert(error.massage);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={loginSubmitHandler}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            value={userEmail}
            onChange={EamilEntryHandler}
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            value={userPassword}
            onChange={passwordEntryHandler}
            className="input"
            type="password"
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
