import React, { useContext } from "react";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import Localbase from "localbase";

export default function GetImages() {
  const { userData } = useContext(UserContext);
  let db = new Localbase("db");

  const requestImages = async () => {
    const urlPrefix = "https://calm-caverns-22270.herokuapp.com/";
    await axiosInstance
      .get(`/company-images/${userData.user.company}/`)
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(urlPrefix + res.data[i].image);
          fetch(urlPrefix + res.data[i].image)
            .then((res) => {
              return res.blob();
            })
            .then((blob) => {
              console.log(blob);
              db.collection("images").add({
                id: res.data[i].id,
                blob: blob,
                documentId: res.data[i].document,
              });
            });
        }
      });
  };
  return (
    <div>
      <button
        onClick={() => {
          requestImages();
        }}
        className="btn"
      >
        Download Images
      </button>
    </div>
  );
}
