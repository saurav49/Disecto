import "./App.css";
import { useState, useEffect } from "react";
import { CreateCollectionModal } from "./Components/index";
import { Routes, Route } from "react-router-dom";
import {
  CollectionList,
  CollectionCardDetail,
} from "./features/collection/index";
import { useDispatch } from "react-redux";
import {
  toggleCollectionLoader,
  fetchAllCollection,
} from "./features/collection/collectionSlice";
import { useNavigate } from "react-router-dom";
import { handleSelectedRole } from "./features/auth/authSlice";
import { Login, Signup } from "./features/auth/index";

function App() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(toggleCollectionLoader("TRUE"));
    dispatch(fetchAllCollection());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAuthBtnClick = (role) => {
    dispatch(handleSelectedRole(role));
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center w-screen h-screen">
              <button
                onClick={() => handleAuthBtnClick("ADMIN")}
                className="mr-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 focus:border-b-0 rounded"
              >
                <span>Login as Admin</span>
              </button>
              <button
                onClick={() => handleAuthBtnClick("USER")}
                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-4 px-8 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
              >
                <span>Login as user</span>
              </button>
            </div>
          }
        />
        <Route
          path="/createcollection"
          element={
            <>
              <button
                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-6 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
                onClick={() => setShowModal((prevValue) => !prevValue)}
              >
                <span>Create Collection</span>
              </button>
              {showModal && (
                <CreateCollectionModal setShowModal={setShowModal} />
              )}
            </>
          }
        />
        <Route path="/collections" element={<CollectionList />} />
        <Route path="/collection/:id" element={<CollectionCardDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
