import axios from "axios";
import React, { useEffect, useState } from "react";

import { axiosTestInstance, axiosInstance } from "src/axiosInstance";
import DashboardContent from "src/components/dashboard/components/DashboardContent";
import OfflineBanner from "src/components/offline/OfflineBanner";

import Localbase from "localbase";

export default function OfflineDashboard() {
  const [companyDocuments, setCompanyDocuments] = useState([]);
  const [companyImages, setCompanyImages] = useState([]);
  const [timeout, setTimeout] = useState();
  const [allowAccess, setAllowAccess] = useState(false);
  let db = new Localbase("db");

  useEffect(() => {
    let isUnmount = false;

    let currentDate = new Date().getTime();

    const getTimeout = () => {
      let offlineTimeout = localStorage.getItem("Timeout");
      setTimeout(parseInt(offlineTimeout) || 0);
    };

    if (currentDate <= timeout) {
      setAllowAccess(true);
    } else {
      setAllowAccess(false);
    }

    const getCompanyDocuments = async () => {
      let offlineDocuments = localStorage.getItem("documents");

      if (!isUnmount) {
        setCompanyDocuments(JSON.parse(offlineDocuments));
      }
    };

    const getCompanyImages = () => {
      db.collection("images")
        .get()
        .then((images) => {
          setCompanyImages(images);
        });
    };

    getTimeout();
    getCompanyDocuments();
    getCompanyImages();

    return () => {
      isUnmount = true;
    };
  }, [timeout]);

  const getImages = async () => {
    const dexUrl =
      "https://calm-caverns-22270.herokuapp.com/https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/CYANIDE%20ANTIDOTE%3A%20CYANOKIT/cyanide-1.png";

    fetch(dexUrl)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        // let objectURL = URL.createObjectURL(blob);
        console.log(blob);
        db.collection("images").add({
          id: 3,
          blob: blob,
          documentId: 102,
        });
      });

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });
    // xhr.open(
    //   "GET",
    //   "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/Dextrose/dextrose-5percent.webp"
    // );
    // xhr.send();
    // let cacheImages = "ourProtocol-v1-images";
    // let imageUrls = [];
    // let singleUrl =
    //   "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp";
    // caches.open("images").then((cache) => {
    //   cache.addAll([
    //     "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp",
    //   ]);
    // });
    // fetch(
    //   "https://calm-caverns-22270.herokuapp.com/https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/Dextrose/dextrose-5percent.webp"
    // ).then((res) => {
    //   console.log(res);
    //   // db.collection("images").add({
    //   //   id: 1,
    //   //   url: url,
    //   //   document: 47,
    //   // });
    // });
    // //   .catch((err) => console.log(err));
    // let file = new Blob(
    //   [
    //     "https://calm-caverns-22270.herokuapp.com/https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/Dextrose/dextrose-5percent.webp",
    //   ],
    //   { type: "image/*" }
    // );
    // console.log(file);
    // let fileTwo = new Blob(
    //   [
    //     "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/CYANIDE+ANTIDOTE%3A+CYANOKIT/cyanide-1.png",
    //   ],
    //   { type: "image/*" }
    // );
    // // db.collection("images").add({
    // //   id: 2,
    // //   url: file,
    // //   document: 123,
    // // });
    // let reader = new FileReader();
    // setOneImage(URL.createObjectURL(file));
    // console.log(file);
    // console.log(fileTwo);
    // db.collection("images").add({
    //   id: 1,
    //   url: ,
    //   document: 47,
    // });
    // This one is sort of working
    // caches.open("images").then((cache) => {
    //   fetch(
    //     "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/Dextrose/dextrose-5percent.webp"
    //   )
    //     .then((res) => {
    //       return res;
    //     })
    //     .then((urls) => {
    //       cache.addAll(urls);
    //     });
    // });
    // caches.open("images").then((cache) => {
    //   fetch(singleUrl)
    //     .then((res) => {
    //       console.log(res);
    //       return res;
    //     })
    //     .then((urls) => {
    //       cache.addAll(urls);
    //     });
    // });
    // axios
    //   .get(
    //     "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    // caches.open("images").then((cache) => {
    //   fetch(singleUrl, {
    //     mode: "cors",
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // });
    // await axiosTestInstance
    //   .get("/company-images/8/")
    //   .then((res) => {
    //     res.data.map((image) => {
    //       return imageUrls.push(image.image);
    //     });
    //   })
    //   .then(() => {
    //     caches.open(cacheImages).then((cache) => {
    //       fetch(imageUrls)
    //         .then((res) => {
    //           return res.json();
    //         })
    //         .then((urls) => {
    //           cache.addAll(urls);
    //         });
    //     });
    //   });
    // caches.open(cacheImages).then((cache) => {
    //   cache.addAll(files);
    // }
  };

  return (
    <div className="mx-auto container pt-12 min-h-screen">
      {allowAccess && <OfflineBanner timeout={timeout} />}
      {allowAccess && (
        <DashboardContent
          companyDocuments={companyDocuments}
          setCompanyDocuments={setCompanyDocuments}
          offline={true}
          companyImages={companyImages}
        />
      )}
      {!allowAccess && (
        <div className="container ">
          <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-warning border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
            <div className="text-2xl">
              Please login to your account to regain access to offline mode.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
