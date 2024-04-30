import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import store from "../store";
import { apiCall } from "../actions/api.action";
import { Client } from "../../types/client.interface";
import { getToken } from "../../utils/get-context.util";
import { Response } from "../../types/order-response";

const initialState: InitialState<Client[]> = {
  data: [] as Client[],
  loading: false,
  error: null,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchClients: (state: InitialState<Client[]>, action: PayloadAction<Response<Client[]>>) => {
      state.error = null;
      state.data = action.payload.result;
      state.loading = false;
    },
    postClient: (state: InitialState<Client[]>, action: PayloadAction<Client>) => {
      state.error = null;
      state.data.push(action.payload);
      state.loading = false;
    },
    removeClient: (state: InitialState<Client[]>, action: PayloadAction<Client>) => {
      state.error = null;
      const clients = state.data.filter(client => client._id !== action.payload._id);
      state.data = clients;
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
  postClient,
  removeClient,
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const getClients = () => apiCall({
  url: 'http://localhost:3000/clients/',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchClients.type,
  onError: apiRequestedFailed.type,
});

export const createClient = (client: Client) => apiCall({
  url: 'http://localhost:3000/clients/',
  method: 'POST',
  data: client,
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: postClient.type,
  onError: apiRequestedFailed.type,
});

export const deleteClient = (id: string) => apiCall({
  url: `http://localhost:3000/clients/${id}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: removeClient.type,
  onError: apiRequestedFailed.type,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;