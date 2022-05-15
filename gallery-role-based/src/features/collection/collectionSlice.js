import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllCollection,
  removeCollectionFromDb,
  editCollection,
  addImage,
  removeImage,
} from "../../services/collection";

const initialState = {
  status: "idle",
  allCollection: [],
  selectedCollection: {},
  collectionLoader: false,
  editCollectionLoader: false,
};

export const fetchAllCollection = createAsyncThunk(
  "collection/fetchAllCollection",
  async () => {
    try {
      const response = await getAllCollection();
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const removeCollection = createAsyncThunk(
  "collection/removeCollection",
  async (id) => {
    try {
      const response = await removeCollectionFromDb(id);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const editInfoCollection = createAsyncThunk(
  "collection/editInfoCollection",
  async (collectionInfo) => {
    try {
      const response = await editCollection(collectionInfo);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const addImageToCollection = createAsyncThunk(
  "collection/addImageToCollection",
  async (imgInfo) => {
    try {
      const response = await addImage(imgInfo);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const removeImageFromCollection = createAsyncThunk(
  "collection/removeImageFromCollection",
  async (imgInfo) => {
    try {
      const response = await removeImage(imgInfo);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    toggleCollectionLoader: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, collectionLoader: true }
        : { ...state, collectionLoader: false };
    },
    toggleEditCollectionLoader: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, editCollectionLoader: true }
        : { ...state, editCollectionLoader: false };
    },
    selectedCollection: (state, action) => {
      localStorage.setItem(
        "selected__collection",
        JSON.stringify(action.payload)
      );
      return { ...state, selectedCollection: action.payload };
    },
  },
  extraReducers: {
    [fetchAllCollection.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllCollection.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allCollection = action.payload.getAllCollection;
      }
      state.collectionLoader = false;
    },
    [fetchAllCollection.rejected]: (state) => {
      state.collectionLoader = false;
      state.status = "error";
    },

    [removeCollection.pending]: (state) => {
      state.status = "loading";
    },
    [removeCollection.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allCollection = state.allCollection.filter(
          (collection) => collection._id !== action.payload.id
        );
      }
      state.collectionLoader = false;
    },
    [removeCollection.rejected]: (state) => {
      state.collectionLoader = false;
      state.status = "error";
    },

    [editInfoCollection.pending]: (state) => {
      state.status = "loading";
    },
    [editInfoCollection.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allCollection = state.allCollection.map((collection) =>
          collection._id === action.payload.id
            ? { ...action.payload.updatedDoc }
            : { ...collection }
        );
        localStorage.setItem(
          "selected__collection",
          JSON.stringify(
            state.allCollection.find(
              (collection) => collection._id === action.payload.id
            )
          )
        );
      }
      state.editCollectionLoader = false;
    },
    [editInfoCollection.rejected]: (state) => {
      state.editCollectionLoader = false;
      state.status = "error";
    },

    [removeImageFromCollection.pending]: (state) => {
      state.status = "loading";
    },
    [removeImageFromCollection.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        console.log(current(state));
        state.allCollection = state.allCollection.map((collection) =>
          collection._id === action.payload.cId
            ? {
                ...collection,
                images: collection.images.filter(
                  (img) => img._id !== action.payload.id
                ),
              }
            : { ...collection }
        );
      }
      console.log(current(state));
      localStorage.setItem(
        "selected__collection",
        JSON.stringify(
          state.allCollection.find(
            (collection) => collection._id === action.payload.cId
          )
        )
      );
      state.collectionLoader = false;
    },
    [removeImageFromCollection.rejected]: (state) => {
      state.collectionLoader = false;
      state.status = "error";
    },

    [addImageToCollection.pending]: (state) => {
      state.status = "loading";
    },
    [addImageToCollection.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        console.log(current(state.allCollection));
        state.allCollection = state.allCollection.map((collection) =>
          collection._id === action.payload.id
            ? {
                ...action.payload.reqCollection,
              }
            : { ...collection }
        );
        console.log(current(state));
      }
      localStorage.setItem(
        "selected__collection",
        JSON.stringify(
          state.allCollection.find(
            (collection) => collection._id === action.payload.id
          )
        )
      );
      state.collectionLoader = false;
    },
    [addImageToCollection.rejected]: (state) => {
      state.collectionLoader = false;
      state.status = "error";
    },
  },
});

export const {
  toggleCollectionLoader,
  selectedCollection,
  toggleEditCollectionLoader,
} = collectionSlice.actions;
export default collectionSlice.reducer;
