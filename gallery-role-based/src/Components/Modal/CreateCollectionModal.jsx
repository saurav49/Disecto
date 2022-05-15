import { useState } from "react";
import { ImageModal } from "../index";
import axios from "axios";
import { COLLECTION_URL } from "../../urls";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const CreateCollectionModal = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    nameError: "",
    descError: "",
    imageError: "",
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleInputValidation = () => {
    if (name.length === 0) {
      setError((prevState) => ({
        ...prevState,
        nameError: "Name field cannot be empty",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        nameError: "",
      }));
    }

    if (description.length === 0) {
      setError((prevState) => ({
        ...prevState,
        descError: "Description field cannot be empty",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        descError: "",
      }));
    }

    if (previewImages.length === 0) {
      setError((prevState) => ({
        ...prevState,
        imageError: "You have not selected any image",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        imageError: "",
      }));
    }
  };

  const handleCollection = async () => {
    handleInputValidation();
    if (error.nameError || error.descError || error.imageError) {
      return;
    }
    try {
      setLoading(true);
      const {
        data: { success },
      } = await axios.post(COLLECTION_URL, {
        name,
        description,
        images: previewImages,
      });
      if (success) {
        navigate("/collections");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    console.log({ name, description, previewImages });
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-slate-900/80">
      {showImageModal && (
        <ImageModal
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          setShowImageModal={setShowImageModal}
        />
      )}
      <div className="flex items-start flex-col w-[300px] sm:w-[400px] md:w-[500px] bg-white text-slate-900 rounded-md shadow-md py-4 px-6 absolute">
        <p className="text-center text-xl font-bold my-2">
          Create a Collection
        </p>
        <div className="flex items-start flex-col w-full my-2">
          <div className="mb-4 text-left w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Name"
            >
              Name
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 text-slate-400 block bg-darkGrey w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm mb-3 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1 sm:text-sm ${
                error && error.nameError && "border border-red-500"
              }`}
              id="Name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="text-red-500 text-sm italic">
              {error && error.nameError}
            </span>
          </div>
          <div className="mb-4 text-left w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Description"
            >
              Description
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 text-slate-400 block bg-darkGrey w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm mb-3 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1 sm:text-sm ${
                error && error.descError && "border border-red-500"
              }`}
              id="Description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="text-red-500 text-sm italic">
              {error && error.descError}
            </span>
          </div>
          <div className="mb-4 text-left w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Upload Images"
            >
              Upload Images
            </label>
            <input
              type="file"
              multiple
              name="upload-imgs"
              id="upload=imgs"
              className="mb-3"
              onChange={(e) => handleImages(e)}
            />
            <p className="text-red-500 text-sm mt-2 italic">
              {error && error.imageError}
            </p>
          </div>
        </div>
        <div className="flex items-center w-100 mt-4">
          <button
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
            onClick={() => setShowModal(false)}
          >
            cancel
          </button>
          <button
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase"
            onClick={handleCollection}
          >
            {loading ? (
              <Oval height="19" width="55" color="#fff" ariaLabel="loading" />
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export { CreateCollectionModal };
