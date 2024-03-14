import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import store from "../store";
import { apiCall } from "../actions/api.action";
import { Client } from "../../types/client.interface";

const initialState: InitialState<Client[]> = {
  data: [] as Client[],
  loading: false,
  error: null,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchClients: (state: InitialState<Client[]>, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    apiRequested: (state: InitialState<Client[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Client[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  },
});

export const {
  apiRequested,
  apiRequestedFailed,
  fetchClients,
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const getClients = (token: string) => apiCall({
  url: 'http://localhost:3000/clients/',
  headers: {
    Authorization: `Bearer ${token}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchClients.type,
  onError: apiRequestedFailed.type,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;