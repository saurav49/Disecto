import "./App.css";
import { useState } from "react";
import { CreateCollectionModal } from "./Components/index";
import { Routes, Route } from "react-router-dom";
import { CollectionList, CollectionCardDetail } from "./Components/index";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </div>
  );
}

export default App;
