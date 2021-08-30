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
import Error from "./components//misc/Error";
import CreateDocumentHeader from "./components/dashboard/components/documents/CreateDocumentHeader";
import CreateMedicine from "./components/dashboard/components/documents/pages/CreateMedicine";
import CreateProcedure from "./components/dashboard/components/documents/pages/CreateProcedure";
import CreateProtocol from "./components/dashboard/components/documents/pages/CreateProtocol";
import HomePage from "./components/dashboard/pages/HomePage";

function App() {
  const [userData, setUserData] = useState({
    user: null,
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const history = useHistory();

  // I do not think I need to be setting the user at the very top of the app. In the dashboard seems to be fine. Leaving code for now to make sure nothing breaks 8/30/21

  // useEffect(() => {

  //   const getUserInfo = async () => {
  //     let token = localStorage.getItem("Authorization");

  //     if (token === null || undefined) {
  //       localStorage.setItem("Authorization", "");
  //       token = "";
  //     }

  //     if (token !== "") {
  //       // I am curious if there is a better way to handle the history.push
  //       // I am unusure if it should be after catching the error or if it shoud be before.
  //       // for now it works - will follow up 8/1/21
  //       axiosInstance.get("/users/info/").then((res) => {
  //         setUserData({
  //           user: res.data[0],
  //         });
  //       });
  //       // .then(() => {
  //       //   history.push("/dashboard");
  //       // })

  //       // .catch((err) => {
  //       //   err ? setErrorMessage("Please log in") : setErrorMessage(undefined);
  //       // });
  //     }
  //   };

  //   getUserInfo();
  // }, [history]);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />

        {errorMessage && (
          <Error
            errorMessage={errorMessage}
            clearError={() => setErrorMessage(undefined)}
          />
        )}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/create-company" component={CreateCompany} />
          <Route exact path="/join-company" component={JoinCompany} />
          <Route
            exact
            path="/create-document-header"
            component={CreateDocumentHeader}
          />
          <Route exact path="/create-medicine" component={CreateMedicine} />

          <Route exact path="/create-procedure" component={CreateProcedure} />
          <Route exact path="/create-protocol" component={CreateProtocol} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
