import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { axiosInstance } from "src/axiosInstance";


export default function ImageView({ currentDocument, editImages }) {
  const [images, setImages] = useState([]);

  const [deleteImageid, setDeleteImageId] = useState();
  const [deleteState, setDeleteState] = useState();

  const history = useHistory();

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

  const handleDeleteSetup = (id) => {
    setDeleteImageId(id);
    setDeleteState(true);
  };

  const handleCancel = () => {
    setDeleteState(false);
    setDeleteImageId(undefined);
  };

  const submitDelete = () => {
    axiosInstance.delete(`/images/${deleteImageid}/`).then(() => {
      window.scrollTo(0, 0);
      history.go(0);
    });
  };

  return (
    <div>
      <div>
        {images &&
          images.length > 0 &&
          images[0] !== undefined &&
          (editImages
            ? images.map((image) => {
                return (
                  <div key={image.id} className="flex flex-col items-end">
                    <img
                      className="mx-auto hover:opacity-30 cursor-pointer"
                      src={image.image}
                      alt={image.image}
                      onClick={() => handleDeleteSetup(image.id)}
                    />
                    {deleteState && deleteImageid === image.id && (
                      <div className="flex justify-around w-1/4 mr-24 py-12">
                        <button
                          className="btn btn-error"
                          onClick={() => submitDelete()}
                        >
                          Confirm Delete
                        </button>
                        <button className="btn" onClick={() => handleCancel()}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            : images.map((image) => {
                return (
                  <div key={image.id} className="flex flex-col items-end">
                    <img
                      className="mx-auto"
                      src={image.image}
                      alt={image.image}
                    />
                  </div>
                );
              }))}
      </div>
    </div>
  );
}
