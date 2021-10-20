import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { axiosInstance } from "src/axiosInstance";

export default function ImageView({
  currentDocument,
  editImages,
  companyImages,
  offline,
}) {
  const [images, setImages] = useState([]);

  const [deleteImageid, setDeleteImageId] = useState();
  const [deleteState, setDeleteState] = useState();

  const history = useHistory();

  useEffect(() => {
    let unMount = false;

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
        if (!unMount) {
          setImages(imageUrls);
        }
      }
    };
    if (!offline) {
      getDocumentImages();
    }
    if (offline) {
      let offlineImages = [];
      let filteredImages = companyImages.filter(
        (image) => currentDocument.id === image.documentId
      );
      filteredImages.map((image) => {
        return offlineImages.push(image);
      });
      setImages(offlineImages);
    }

    return () => {
      unMount = true;
    };
  }, [currentDocument, companyImages, offline]);

  const handleDeleteSetup = (id) => {
    console.log(images);
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
          !offline &&
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

        {offline &&
          images.length > 0 &&
          images.map((image) => {
            return (
              <img
                key={image.id}
                src={URL.createObjectURL(image.blob)}
                alt=""
              />
            );
          })}
      </div>
    </div>
  );
}
