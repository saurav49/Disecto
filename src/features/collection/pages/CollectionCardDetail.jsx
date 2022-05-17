import { useState } from "react";
import { useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../../utils";
import {
  removeCollection,
  removeImageFromCollection,
  addImageToCollection,
  toggleCollectionLoader,
} from "../collectionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditModal } from "../../../Components/index";
import { ImageModal } from "../../../Components/index";
import { Oval } from "react-loader-spinner";

const CollectionCardDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  let { selectedCollection, collectionLoader } = useSelector(
    (state) => state.collection
  );
  if (!selectedCollection.hasOwnProperty("name")) {
    selectedCollection = JSON.parse(
      localStorage.getItem("selected__collection")
    );
  }

  const handleImages = (e) => {
    const files = e.target.files;
    handelImagePreview(files);
  };

  const handelImagePreview = (files) => {
    setPreviewImages([]);
    Object.values(files).forEach((file) => {
      (function (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          setPreviewImages((previousImages) => [
            ...previousImages,
            reader.result.replace(/(\r\n|\n|\r)/gm, ""),
          ]);
        });
      })(file);
    });
    setShowImageModal(true);
  };

  const handleDeleteCollection = () => {
    dispatch(
      removeCollection(selectedCollection?.id || selectedCollection?._id)
    );
    setTimeout(() => {
      navigate("/collections");
    }, 1000);
  };

  const handleDeleteImageFromCollection = (imgId) => {
    dispatch(toggleCollectionLoader("TRUE"));
    dispatch(
      removeImageFromCollection({
        cId: selectedCollection?.id || selectedCollection?._id,
        imgInfo: imgId,
      })
    );
  };

  const handleAddImageToCollection = (previewImages) => {
    dispatch(toggleCollectionLoader("TRUE"));
    dispatch(
      addImageToCollection({
        cId: selectedCollection?.id || selectedCollection?._id,
        imgInfo: previewImages[0],
      })
    );
  };

  return (
    <div className=" flex flex-col items-start justify-between p-5 mt-10">
      {showModal && (
        <EditModal
          selectedCollection={selectedCollection}
          setShowModal={setShowModal}
        />
      )}
      {showImageModal && (
        <ImageModal
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          setShowImageModal={setShowImageModal}
        />
      )}
      <button
        className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
        onClick={() => navigate("/collections")}
      >
        Back
      </button>
      <div className="flex items-center w-100 mb-2 self-end">
        <button
          onClick={handleDeleteCollection}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-red-700 hover:border-slate-500 rounded uppercase mr-5"
        >
          Delete
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase"
        >
          <span>Edit</span>
        </button>
      </div>
      <div className="pl-3 flex flex-col items-start">
        {selectedCollection && (
          <h1 className="text-4xl font-semibold">{selectedCollection?.name}</h1>
        )}
        {selectedCollection && (
          <p className="italic mt-3 mb-4 text-left text-lg text-slate-600">
            {selectedCollection?.description}
          </p>
        )}
      </div>
      {collectionLoader ? (
        <div className="flex items-center justify-center w-full h-[320px]">
          <Oval height="55" width="55" color="#fff" ariaLabel="loading" />
        </div>
      ) : (
        <div className="flex items-center justify-evenly flex-wrap">
          {selectedCollection &&
            selectedCollection?.images &&
            selectedCollection.images.map(({ id, _id }) => {
              return (
                <div className="flex flex-col items-start m-2" key={id}>
                  <AdvancedImage
                    cldImg={cld.image(id)}
                    className="align-middle w-[280px] h-[270px] rounded-lg"
                  />
                  <div className="flex items-center w-100 mt-4">
                    <button
                      onClick={() => handleDeleteImageFromCollection(_id)}
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-red-700 hover:border-slate-500 rounded uppercase mr-5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="ml-4 mb-4 text-left flex flex-col items-start justify-around">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="Upload Images"
            >
              Upload Images
            </label>
            <input
              type="file"
              name="upload-imgs"
              id="upload=imgs"
              className="mb-3"
              onChange={(e) => handleImages(e)}
            />
            {Array.isArray(previewImages) && previewImages.length > 0 && (
              <button
                onClick={() => handleAddImageToCollection(previewImages)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase mr-5"
              >
                {collectionLoader ? (
                  <Oval
                    height="19"
                    width="55"
                    color="#fff"
                    ariaLabel="loading"
                  />
                ) : (
                  <span>Add Image</span>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { CollectionCardDetail };
