import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { apiCall } from "../actions/api.action";
import { Auth } from "../../types/auth.interface";
import { setCredentials } from "../../utils/set-credentials.util";

const initialState: InitialState<Auth> = {
  data: {
    isAuthenticated: false,
  } as Auth,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchToken: (state: InitialState<Auth>, action: PayloadAction<Auth>) => {
      state.loading = false;
      state.data = action.payload;
      state.data.isAuthenticated = true;
      setCredentials(action.payload);
    },
    apiRequested: (state: InitialState<Auth>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Auth>, action) => {
      state.loading = false;
      state.error = action.payload
      state.data.isAuthenticated = false;
    },
  },
});

export const {
  apiRequested,
  apiRequestedFailed,
  fetchToken,
} = authSlice.actions;

export default authSlice.reducer;

export const getToken = (username: string, password: string) => apiCall({
  url: 'http://localhost/api/v1/auth/login',
  method: 'POST',
  data: {
    username,
    password,
  },
  onStart: apiRequested.type,
  onSuccess: fetchToken.type,
  onError: apiRequestedFailed.type
});