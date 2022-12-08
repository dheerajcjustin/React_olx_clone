import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const navigate = useHistory();
  const [username, setUsername] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const { Firebase } = useContext(FirebaseContext);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const userEmailHandler = (e) => {
    setuserEmail(e.target.value);
  };
  const userPasswordHandler = (e) => {
    setuserPassword(e.target.value);
  };
  const userPhoneHandler = (e) => {
    setuserPhone(e.target.value);
  };
  const submitHandeler = (e) => {
    e.preventDefault();
    console.log();
    console.log("wowr fire base is working ", Firebase);
    Firebase.auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("hai  user ennu vechal ");
        // ...
        user.updateProfile({ displayName: username }).then(() => {
          Firebase.firestore()
            .collection("userDetails")
            .add({
              id: user.uid,
              username: username,
              phone: userPhone,
            })
            .then(() => {
              console.log("hai indide the navigat");
              navigate.push("/login");
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={submitHandeler}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={usernameHandler}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="userEmail">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="userEmail"
            value={userEmail}
            name="email"
            onChange={userEmailHandler}
            defaultValue="John"
          />
          <br />
          <label htmlFor="userPhone">Phone</label>
          <br />
          <input
            value={userPhone}
            className="input"
            onChange={userPhoneHandler}
            type="text"
            id="userPhone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={userPassword}
            onChange={userPasswordHandler}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
