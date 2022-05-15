import React from "react";

const ImageModal = ({ previewImages, setPreviewImages, setShowImageModal }) => {
  const handleCancelPreview = () => {
    setShowImageModal(false);
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-slate-900/80 overflow-auto">
      <div className="flex items-center justify-center flex-col w-[90%] py-2 bg-white text-slate-900 rounded-md shadow-md py-8 px-4 absolute">
        <h2 className="text-3xl text-slate-600 mb-6">Image Preview</h2>
        <div className="flex items-center justify-around flex-wrap">
          {Array.isArray(previewImages) &&
            previewImages.length > 0 &&
            previewImages.map((img, idx) => {
              return (
                <img
                  src={img}
                  alt="preview_profile"
                  className="w-[280px] rounded-lg m-2 border"
                  key={idx}
                />
              );
            })}
        </div>
        <button
          className="mt-4 bg-slate-500 hover:bg-slate-400 text-white text-center font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
          onClick={handleCancelPreview}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export { ImageModal };
