import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.green-api.com/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiTokenInstance}`,
        headers: {},
      };

      const response = await axios.request(config);
      if (response.data.stateInstance !== "authorized") {
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
