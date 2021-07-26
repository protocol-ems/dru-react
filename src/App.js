import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import UserContext from "./components/context/UserContext";

import Navbar from "./components/navbar/Navbar";

import Register from "./components/userauth/Register";
import Login from "./components/userauth/Login";

function App() {
  // const [userData, setUserData] = useState({
  //   token: undefined,
  //   user: undefined,
  // });

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     let token = localStorage.getItem("Authorization");
  //     if (token === null) {
  //       localStorage.setItem("Authorization", "");
  //       token = "";
  //     }
  //     const tokenRes = await Axios.post(
  //       "http://localhost:8080/users/tokenIsValid",
  //       null,
  //       { headers: { "Authorization": token } }
  //     );
  //     if (tokenRes.data) {
  //       const userRes = await Axios.get("http://localhost:8080/users/", {
  //         headers: { "Authorization": token },
  //       });
  //       setUserData({
  //         token,
  //         user: userRes.data,
  //       });
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
