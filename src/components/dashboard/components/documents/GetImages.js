import React, { useContext, useState } from "react";
import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import Localbase from "localbase";

export default function GetImages() {
  const { userData } = useContext(UserContext);
  const [confirm, setConfirm] = useState(false);
  const [downloading, setDownloading] = useState(false);
  let db = new Localbase("db");

  const requestImages = async () => {
    const urlPrefix = "https://calm-caverns-22270.herokuapp.com/";
    setDownloading(true);
    await axiosInstance
      .get(`/company-images/${userData.user.company}/`)
      .then((res) => {
        if (res.data) {
          db.collection("images").delete();
        }
        for (let i = 0; i < res.data.length; i++) {
          fetch(urlPrefix + res.data[i].image)
            .then((res) => {
              return res.blob();
            })
            .then((blob) => {
              db.collection("images").add({
                id: res.data[i].id,
                blob: blob,
                documentId: res.data[i].document,
              });
            });
        }
      });
    setConfirm(false);
    setDownloading(false);
  };
  return (
    <div className="md:w-1/2 border rounded mt-12 flex flex-col items-center justify-center p-12">
      <div className="text-3xl">Download Company Images</div>
      <div className="text-sm text-gray-600 mt-4">
        OurProtocol does not recommend downloading images on a mobile internet
        connection.
      </div>
      <div>
        {!confirm && (
          <button
            onClick={() => {
              setConfirm(true);
            }}
            className="btn btn-accent mt-8"
          >
            Download Images
          </button>
        )}
        {confirm && (
          <div className="flex">
            <button
              onClick={() => {
                requestImages();
              }}
              className="btn btn-accent mt-8"
            >
              Confirm Download
            </button>
            <button
              onClick={() => {
                setConfirm(false);
              }}
              className="btn mt-8"
            >
              Cancel Download
            </button>
          </div>
        )}
        {downloading && <div className="loader"></div>}
      </div>
    </div>
  );
}
