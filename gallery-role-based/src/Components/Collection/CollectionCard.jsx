import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../utils";

const CollectionCard = ({ name, description, images }) => {
  console.log({ name, description, images });
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <AdvancedImage
        cldImg={cld.image(`${images[0].id}`)}
        className="align-middle w-[280px] h-[270px] rounded-t-lg"
      />
      <div className="px-6 py-4">
        <div class="font-bold text-xl mb-2">{name}</div>
        <p class="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export { CollectionCard };
