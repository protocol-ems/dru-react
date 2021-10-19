import axios from "axios";
import React, { useEffect, useState } from "react";

import { axiosTestInstance, axiosInstance } from "src/axiosInstance";
import DashboardContent from "src/components/dashboard/components/DashboardContent";
import OfflineBanner from "src/components/offline/OfflineBanner";

export default function OfflineDashboard() {
  const [companyDocuments, setCompanyDocuments] = useState([]);
  const [timeout, setTimeout] = useState();
  const [allowAccess, setAllowAccess] = useState(false);

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

    getTimeout();
    getCompanyDocuments();

    return () => {
      isUnmount = true;
    };
  }, [timeout]);

  const getImages = async () => {
    // let cacheImages = "ourProtocol-v1-images";
    // let imageUrls = [];
    // let singleUrl =
    //   "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp";

    // caches.open("images").then((cache) => {
    //   cache.addAll([
    //     "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp",
    //   ]);
    // });
    caches.open("images").then((cache) => {
      fetch(
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/images/Lane+County/Dextrose/dextrose-5percent.webp"
      )
        .then((res) => {
          return res;
        })
        .then((urls) => {
          cache.addAll(urls);
        });
    });

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
      <button
        className="btn"
        onClick={() => {
          getImages();
        }}
      >
        Get Images
      </button>
      <img
        src={
          "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp"
        }
        alt=""
      />
      {allowAccess && <OfflineBanner timeout={timeout} />}
      {allowAccess && (
        <DashboardContent
          companyDocuments={companyDocuments}
          setCompanyDocuments={setCompanyDocuments}
          offline={true}
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
