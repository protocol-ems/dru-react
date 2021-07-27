import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  return (
    <div>
      <div>Main Dashboard</div>

      {userData ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )}

      <button onClick={() => console.log(userData)}>click</button>
    </div>
  );
}
