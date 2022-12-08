import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Sell from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./context/authContext";
import { ViewPostContext, Post } from "./context/viewPostContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { Firebase } = useContext(FirebaseContext);
  const { loginStuatus, setloginStuatus } = useContext(AuthContext);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      setloginStuatus(user);
    });
  }, []);

  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/sell">
            <Sell></Sell>
          </Route>
          <Route path="/view/:id">
            <ViewPost></ViewPost>
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
