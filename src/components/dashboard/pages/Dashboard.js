import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../../axios";

import CreateOrJoinHeader from "../components/CreateOrJoinHeader";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  const [companyUsers, setCompanyUsers] = useState(null);
  const [userWaitList, setUserWaitList] = useState(null);
  const [companyDocuments, setCompanyDocuments] = useState([]);

  useEffect(() => {
    console.log(userData);
    let token = localStorage.getItem("Authorization");
    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance
          .get(`/company-users/${companyId}/`)
          .then((res) => {
            setCompanyUsers(res.data);
          })

          .then(() => {
            axiosInstance.get(`/company-waitlist/${companyId}/`).then((res) => {
              setUserWaitList(res.data);
            });
          });
      }
    };
    const getCompanyDocuments = async () => {
      if (token !== "") {
        let companyId = userData.user.company || 1;
        await axiosInstance
          .get(`company-documents/${companyId}/`)
          .then((res) => {
            setCompanyDocuments(res.data);
          });
      }
    };
    if (userData.user !== null && userData.user.employee_type === 4) {
      // getCompanyInfo().then(() => getCompanyDocuments());
      getCompanyDocuments().then(() => getCompanyInfo());
    }
    if (userData.user !== null && userData.user.employee_type !== 4) {
      getCompanyDocuments();
    }
  }, [userData.user, userData]);

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     let token = localStorage.getItem("Authorization");

  //     if (token === null || undefined) {
  //       localStorage.setItem("Authorization", "");
  //       token = "";
  //     }

  //     if (token !== "null") {
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
  //     // if (token === "null") {
  //     //   console.log("no user logged in");
  //     //   history.push("/login");
  //     // }
  //   };

  //   getUserInfo();
  // }, [history, setUserData]);

  return (
    <div className="container mx-auto ">
      {/* <h1 className="text-5xl mx-auto">Dashboard</h1>
      {userData.user !== null ? (
        <h1>Currently logged in as: {userData.user.username}</h1>
      ) : (
        "Please log in"
      )} */}

      {/* <button className="btn" onClick={() => console.log(userData.user)}>
        click
      </button> */}
      {userData.user !== null && userData.user.company === 1 ? (
        <CreateOrJoinHeader />
      ) : (
        <DashboardContent
          companyUsers={companyUsers}
          setCompanyUsers={setCompanyUsers}
          userWaitList={userWaitList}
          setUserWaitList={setUserWaitList}
          companyDocuments={companyDocuments}
          setCompanyDocuments={setCompanyDocuments}
        />
      )}
    </div>
  );
}
