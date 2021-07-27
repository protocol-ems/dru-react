import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <div>Main Dashboard</div>

      {userData.user !== null ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )}

      <button onClick={() => console.log(userData)}>click</button>
    </div>
  );
}
