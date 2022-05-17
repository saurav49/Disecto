import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUserSignUp, handleUserLogin } from "../../services/auth";

const initialState = {
  status: "idle",
  userInfo: {},
  userSelectedRole: "",
  authLoader: false,
  accessToken: "",
};

export const signUpUser = createAsyncThunk(
  "collection/signUpUser",
  async ({ name, username, email, password, userSelectedRole }) => {
    try {
      const response = await handleUserSignUp(
        name,
        username,
        email,
        password,
        userSelectedRole
      );
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const loginUser = createAsyncThunk(
  "collection/loginUser",
  async ({ email, password }) => {
    try {
      const response = await handleUserLogin(email, password);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthLoader: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, authLoader: true }
        : { ...state, authLoader: false };
    },
    handleSelectedRole: (state, action) => {
      return { ...state, userSelectedRole: action.payload };
    },
    handleUserLogout: (state) => {
      sessionStorage.removeItem("disecto__token");
      sessionStorage.removeItem("current__user__roles");
      return {
        ...state,
        userInfo: {},
        userSelectedRole: "",
        accessToken: "",
      };
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.userInfo = {
          name: action.payload.savedUser.name,
          username: action.payload.savedUser.username,
          email: action.payload.savedUser.email,
          roles: action.payload.savedUser.roles,
        };
        state.accessToken = action.payload.savedUser.token;
        sessionStorage.setItem(
          "current__user__roles",
          JSON.stringify(action.payload.savedUser.role)
        );
        sessionStorage.setItem(
          "disecto__token",
          JSON.stringify(action.payload.token)
        );
        alert("Sign up successful");
      }
      state.authLoader = false;
    },
    [signUpUser.rejected]: (state) => {
      state.authLoader = false;
      state.status = "error";
    },

    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.userInfo = {
          name: action.payload.savedUser.name,
          username: action.payload.savedUser.username,
          email: action.payload.savedUser.email,
          roles: action.payload.savedUser.roles,
        };
        state.accessToken = action.payload.savedUser.token;
        sessionStorage.setItem(
          "current__user__roles",
          JSON.stringify(action.payload.savedUser.roles)
        );
        sessionStorage.setItem(
          "disecto__token",
          JSON.stringify(action.payload.token)
        );
        alert("Login successful");
      }
      state.authLoader = false;
    },
    [loginUser.rejected]: (state) => {
      state.authLoader = false;
      state.status = "error";
    },
  },
});

export const { toggleAuthLoader, handleSelectedRole, handleUserLogout } =
  authSlice.actions;
export default authSlice.reducer;
