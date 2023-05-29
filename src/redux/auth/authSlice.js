import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  logInFulfilledReducer,
  reducerPending,
  reducerRejected,
  refreshUserFulfilledReducer,
  refreshUserPendingReducer,
  refreshUserRejectedReducer,
} from "./authSliceReducers";
import { logIn, refreshUser } from "./operations";
import { getActions } from "../../helpers/functions";

const initialState = {
  user: { idInstance: null, apiTokenInstance: null },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  isRefreshing: false,
};

const extraActions = [logIn];

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, logInFulfilledReducer)
      .addCase(refreshUser.pending, refreshUserPendingReducer)
      .addCase(refreshUser.fulfilled, refreshUserFulfilledReducer)
      .addCase(refreshUser.rejected, refreshUserRejectedReducer)
      .addMatcher(
        isAnyOf(...getActions(extraActions, "pending")),
        reducerPending
      )
      .addMatcher(
        isAnyOf(...getActions(extraActions, "rejected")),
        reducerRejected
      );
  },
});

export const authReducer = authSlice.reducer;
