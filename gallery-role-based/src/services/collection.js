import {
  COLLECTION_URL,
  EDIT_COLLECTION_URL,
  ADD_IMG_URL,
  REMOVE_IMG_URL,
} from "../urls";
import axios from "axios";

const getAllCollection = async () => {
  try {
    const response = await axios.get(COLLECTION_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const removeCollectionFromDb = async (id) => {
  try {
    const response = await axios.delete(`${COLLECTION_URL}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const editCollection = async (collectionInfo) => {
  try {
    const response = await axios.post(
      `${EDIT_COLLECTION_URL}/${collectionInfo.cId}`,
      { collectionInfo }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addImage = async (info) => {
  try {
    const response = await axios.post(`${ADD_IMG_URL}/${info.cId}`, {
      imgInfo: info.imgInfo,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const removeImage = async (info) => {
  try {
    const response = await axios.post(`${REMOVE_IMG_URL}/${info.cId}`, {
      imgId: info.imgInfo,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllCollection,
  removeCollectionFromDb,
  editCollection,
  addImage,
  removeImage,
};
