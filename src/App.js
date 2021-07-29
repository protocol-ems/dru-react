import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { axiosInstance } from "./axios";

import UserContext from "./components/context/UserContext";

import Navbar from "./components/navbar/Navbar";
import Register from "./components/userauth/Register";
import Login from "./components/userauth/Login";
import Dashboard from "./components/dashboard/pages/Dashboard";
import CreateCompany from "./components/dashboard/components/CreateCompany";
import JoinCompany from "./components/dashboard/components/JoinCompany";

function App() {
  const [userData, setUserData] = useState({
    user: null,
  });

  const history = useHistory();

  useEffect(() => {
    const getUserInfo = async () => {
      let token = localStorage.getItem("Authorization");

      if (token === "null") {
        localStorage.setItem("Authorization", "");
        token = "";
      }

      if (token !== "") {
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
      }
    };

    getUserInfo();
  }, [history]);

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
          <Route exact path="/create-company" component={CreateCompany} />
          <Route exact path="/join-company" component={JoinCompany} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
