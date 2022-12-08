import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext, Context } from "./context/authContext";

import { Firebase } from "./firebase/config";

ReactDOM.render(
  <FirebaseContext.Provider value={{ Firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
