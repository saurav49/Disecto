import "./App.css";
import { useState, useEffect } from "react";
import {
  CreateCollectionModal,
  Navbar,
  PrivateRoute,
  Unauthorized,
} from "./Components/index";
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
import { ROLES } from "./utils";

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
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center w-screen h-screen">
              <button
                onClick={() => handleAuthBtnClick("ADMIN")}
                className="mr-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 focus:border-b-0 rounded"
              >
                <span>Login as Admin(Testing)</span>
              </button>
              <button
                onClick={() => handleAuthBtnClick("USER")}
                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-4 px-8 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
              >
                <span>Login as agent</span>
              </button>
            </div>
          }
        />
        <Route element={<PrivateRoute allowdRoles={[ROLES.admin]} />}>
          <Route
            path="/createcollection"
            element={
              <div className="w-screen h-[83.5vh] flex items-center justify-center">
                <button
                  className="bg-slate-500 hover:bg-slate-400 text-white text-2xl font-bold py-4 px-8 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                >
                  <span>Create Collection</span>
                </button>
                {showModal && (
                  <CreateCollectionModal setShowModal={setShowModal} />
                )}
              </div>
            }
          />
        </Route>
        <Route
          element={<PrivateRoute allowdRoles={[ROLES.admin, ROLES.user]} />}
        >
          <Route path="/collections" element={<CollectionList />} />
          <Route path="/collection/:id" element={<CollectionCardDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
