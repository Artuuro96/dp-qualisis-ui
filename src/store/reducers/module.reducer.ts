import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { getToken } from "../../utils/get-context.util";
import { apiCall } from "../actions/api.action";
import { Module } from "../../types/module.interface";

const initialState: InitialState<Module[]> = {
  loading: false,
  data: [],
  error: null,
}

export const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    fetchAllModules: (state: InitialState<Module[]>, action: PayloadAction<Module[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    apiRequested: (state: InitialState<Module[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Module[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchAllModules,
  apiRequested,
  apiRequestedFailed,
} = moduleSlice.actions;

export default moduleSlice.reducer;

export const getModules = () => apiCall({
  url: 'http://localhost/api/v1/module',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllModules.type,
  onError: apiRequestedFailed.type,
})