import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { CollectionCard } from "./CollectionCard";
import { fetchAllCollection, toggleCollectionLoader } from "../collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CollectionList = () => {
  const { allCollection, collectionLoader } = useSelector(
    (state) => state.collection
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(toggleCollectionLoader("TRUE"));
    dispatch(fetchAllCollection());
  }, []);

  return (
    <div className="w-screen min-h-screen my-2">
      {collectionLoader && (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Oval height="100" width="100" color="#fff" ariaLabel="loading" />
        </div>
      )}
      {!collectionLoader && (
        <div className="flex items-center flex-wrap justify-evenly cursor-pointer">
          {Array.isArray(allCollection) && allCollection.length > 0 ? (
            allCollection.map(({ _id, name, description, images }) => {
              return (
                <CollectionCard
                  key={_id}
                  id={_id}
                  name={name}
                  description={description}
                  images={images}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
              <p className="text-3xl mb-4 text-slate-600">
                No Collection Present
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase"
              >
                Create a Collection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { CollectionList };
