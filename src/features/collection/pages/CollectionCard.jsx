import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../../utils";
import { selectedCollection } from "../collectionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ id, name, description, images }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("change there");
  const handleCardClick = () => {
    dispatch(
      selectedCollection({
        id,
        name,
        description,
        images,
      })
    );
    setTimeout(() => {
      navigate(`/collection/${id}`);
    }, 1000);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      onClick={handleCardClick}
    >
      <AdvancedImage
        cldImg={cld.image(`${images[0].id}`)}
        className="align-middle w-full h-[340px] rounded-t-lg"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          {description.length < 10
            ? description
            : `${description.split(" ").slice(0, 9).join(" ")}....`}
        </p>
      </div>
    </div>
  );
};

export { CollectionCard };
