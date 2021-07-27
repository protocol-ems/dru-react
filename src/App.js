import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { axiosInstance } from "./axios";

import UserContext from "./components/context/UserContext";

import Navbar from "./components/navbar/Navbar";
import Register from "./components/userauth/Register";
import Login from "./components/userauth/Login";
import Dashboard from "./components/dashboard/pages/Dashboard";

function App() {
  const [userData, setUserData] = useState({
    user: null,
  });

  const history = useHistory();

  useEffect(() => {
    const getUserInfo = async () => {
      let token = localStorage.getItem("Authorization");
      if (token === null) {
        localStorage.setItem("Authorization", "");
        token = "";
      }

      const userInfo = await axiosInstance.get("/users/info/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (userInfo.data) {
        setUserData({
          user: userInfo.data[0],
        });
        history.push("/dashboard");
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
