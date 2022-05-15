import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { COLLECTION_URL } from "../../urls";
import { CollectionCard } from "./CollectionCard";

const CollectionList = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const {
          data: { success, getAllCollection },
        } = await axios.get(COLLECTION_URL);
        if (success) {
          setCollectionList(getAllCollection);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="w-screen min-h-screen my-2">
      {loading && (
        <div className="flex items-center justify-center w-[80%] min-h-screen">
          <Oval height="100" width="100" color="#fff" ariaLabel="loading" />
        </div>
      )}
      {!loading && (
        <div className="flex items-center flex-wrap justify-evenly cursor-pointer">
          {Array.isArray(collectionList) && collectionList.length > 0 ? (
            collectionList.map(({ name, description, images }) => {
              return (
                <CollectionCard
                  name={name}
                  description={description}
                  images={images}
                />
              );
            })
          ) : (
            <p>No Collection Present</p>
          )}
        </div>
      )}
    </div>
  );
};

export { CollectionList };
