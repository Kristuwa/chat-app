import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { checkAuth } from "../../api/api";

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await checkAuth(credentials);
      if (response !== "authorized") {
        toast(
          "You are not authorized! Please authorize your profile and try again"
        );
        return;
      }
      return credentials;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const persistedToken = state.auth.user.apiTokenInstance;

      if (persistedToken === null) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }

      return state.auth.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
