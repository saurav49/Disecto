import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editInfoCollection,
  toggleEditCollectionLoader,
} from "../../features/collection/collectionSlice";

const EditModal = ({ selectedCollection, setShowModal }) => {
  const { editCollectionLoader } = useSelector((state) => state.collection);
  const [name, setName] = useState(selectedCollection?.name);
  const [description, setDescription] = useState(
    selectedCollection?.description
  );
  //   const [previewImages, setPreviewImages] = useState([]);
  //   const [showImageModal, setShowImageModal] = useState(false);
  const dispatch = useDispatch();

  //   const handleImages = (e) => {
  //     const files = e.target.files;
  //     handelImagePreview(files);
  //   };

  //   const handelImagePreview = (files) => {
  //     setPreviewImages([]);
  //     Object.values(files).forEach((file) => {
  //       (function (file) {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.addEventListener("load", () => {
  //           setPreviewImages((previousImages) => [
  //             ...previousImages,
  //             reader.result.replace(/(\r\n|\n|\r)/gm, ""),
  //           ]);
  //         });
  //       })(file);
  //     });
  //     setShowImageModal(true);
  //   };

  const handleEditCollection = async () => {
    dispatch(toggleEditCollectionLoader("TRUE"));
    dispatch(
      editInfoCollection({
        cId: selectedCollection?.id || selectedCollection?._id,
        name: name.length > 0 ? name : selectedCollection.name,
        description:
          description.length > 0 ? description : selectedCollection.description,
      })
    );
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-slate-900/80 overflow-auto">
      {/* {showImageModal && (
        <ImageModal
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          setShowImageModal={setShowImageModal}
        />
      )} */}
      <div className="flex items-start flex-col w-[300px] sm:w-[400px] md:w-[500px] bg-white text-slate-900 rounded-md shadow-md py-4 px-6 absolute">
        <p className="text-center text-xl font-bold my-2">Edit Collection</p>
        <div className="flex items-start flex-col w-full my-2">
          <div className="mb-4 text-left w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Name"
            >
              Name
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 text-slate-400 block bg-darkGrey w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm mb-3 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1 sm:text-sm`}
              id="Name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 text-left w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Description"
            >
              Description
            </label>
            <input
              className={`placeholder:italic placeholder:text-slate-400 text-slate-400 block bg-darkGrey w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm mb-3 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1 sm:text-sm`}
              id="Description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="mb-4 text-left w-full">
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
          </div> */}
        </div>
        <div className="flex items-center w-100 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
          >
            cancel
          </button>
          <button
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase"
            onClick={handleEditCollection}
          >
            {editCollectionLoader ? (
              <Oval height="19" width="55" color="#fff" ariaLabel="loading" />
            ) : (
              <span>Edit</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditModal };
