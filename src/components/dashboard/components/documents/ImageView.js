import React, { useState, useEffect } from "react";

import { axiosInstance } from "../../../../axios";

export default function ImageView({ currentDocument }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getDocumentImages = async () => {
      if (
        currentDocument.document_images &&
        currentDocument.document_images.length > 0
      ) {
        let imageUrls = [];
        for (let i = 0; i < currentDocument.document_images.length; i++) {
          await axiosInstance
            .get(`/document-images/${currentDocument.id}/`)
            .then((res) => {
              imageUrls.push(res.data[i]);
            });
        }
        setImages(imageUrls);
      }
    };
    getDocumentImages();
  }, [currentDocument]);

  return (
    <div>
      <div>
        {images.map((image) => {
          console.log(image);
          return <img src={image.image} alt={image.image} key={image.id}></img>;
        })}
      </div>
    </div>
  );
}
