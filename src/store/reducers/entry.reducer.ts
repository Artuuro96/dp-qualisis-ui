import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { apiCall } from "../actions/api.action";
import { getToken } from "../../utils/get-context.util";
import { Entry } from "../../types/entry.interface";
import { Response } from "../../types/order-response";

const initialState: InitialState<Entry[]> = {
  loading: false,
  data: [],
  error: null,
}

export const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    fetchAllEntries: (state: InitialState<Entry[]>, action: PayloadAction<Response<Entry[]>>) => {
      state.error = null;
      state.data = action.payload.result;
      state.loading = false;
    },
    postEntry: (state: InitialState<Entry[]>, action: PayloadAction<Entry>) => {
      state.error = null;
      state.data.push(action.payload);
      state.loading = false;
    },
    removeEntry: (state: InitialState<Entry[]>, action: PayloadAction<Entry>) => {
      state.error = null;
      const filteredEntries = state.data.filter(d => d._id !== action.payload._id);
      state.data = filteredEntries;
      state.loading = false; 
    },
    apiRequested: (state: InitialState<Entry[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Entry[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchAllEntries,
  postEntry,
  removeEntry,
  apiRequested,
  apiRequestedFailed
} = entrySlice.actions

export default entrySlice.reducer;

export const getEntries = () => apiCall({
  url: 'http://localhost:3000/entries',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllEntries.type,
  onError: apiRequestedFailed.type,
});

export const createEntry = (entry: Entry) => apiCall({
  url: 'http://localhost:3000/entries',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  data: entry,
  onStart: apiRequested.type,
  onSuccess: postEntry.type,
  onError: apiRequestedFailed.type,
});

export const deleteEntry = (entryId: string) => apiCall({
  url: `http://localhost:3000/entries/${entryId}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  onStart: apiRequested.type,
  onSuccess: removeEntry.type,
  onError: apiRequestedFailed.type,
});
