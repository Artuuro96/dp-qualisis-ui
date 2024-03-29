import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { apiCall } from "../actions/api.action";
import { Auth } from "../../types/auth.interface";
import { setCredentials } from "../../utils/set-credentials.util";
import { Role } from "../../types/role.interface";
import { getToken, getUserContext } from "../../utils/get-context.util";

const initialState: InitialState<Auth> = {
  data: {
    isAuthenticated: false,
    isAuthWithRole: false,
  } as Auth,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state: InitialState<Auth>, action: PayloadAction<Auth>) => {
      state.loading = false;
      state.data = action.payload;
      state.data.isAuthenticated = true;
      state.data.isAuthWithRole = false
      setCredentials(action.payload);
      state.data.context = getUserContext();
    },
    loginUserAs: (state: InitialState<Auth>, action: PayloadAction<Auth>) => {
      state.loading = false;
      state.data = action.payload;
      state.data.isAuthenticated = true;
      state.data.isAuthWithRole = true;
      setCredentials(action.payload);
      state.data.context = getUserContext();
    },
    logout: (state: InitialState<Auth>) => {
      state.loading = false;
      state.data = {} as Auth;
      state.data.isAuthenticated = false;
      state.data.isAuthWithRole = false;
    },
    apiRequested: (state: InitialState<Auth>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Auth>, action) => {
      state.loading = false;
      state.error = action.payload
      state.data.isAuthenticated = false;
      state.data.isAuthWithRole = false;
    },
  },
});

export const {
  apiRequested,
  apiRequestedFailed,
  loginUser,
  loginUserAs,
} = authSlice.actions;

export default authSlice.reducer;

export const login = (username: string, password: string) => apiCall({
  url: 'http://localhost/api/v1/auth/login',
  method: 'POST',
  data: {
    username,
    password,
  },
  onStart: apiRequested.type,
  onSuccess: loginUser.type,
  onError: apiRequestedFailed.type,
});

export const loginAs = (role: Role) => apiCall({
  url: 'http://localhost/api/v1/auth/loginAs',
  method: 'POST',
  data: {
    activeRole: {
      ...role
    }
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: loginUserAs.type,
  onError: apiRequestedFailed.type,
})