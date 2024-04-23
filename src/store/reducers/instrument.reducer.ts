import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { apiCall } from "../actions/api.action";
import { getToken } from "../../utils/get-context.util";
import { Response } from "../../types/order-response";
import { Instrument } from "../../types/instrument.interface";

const initialState: InitialState<Instrument[]> = {
  loading: false,
  data: [],
  error: null,
}

export const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    fetchInstrumentsByEntryId: (state: InitialState<Instrument[]>, action: PayloadAction<Response<Instrument[]>>) => {
      state.error = null;
      state.data = action.payload.result;
      state.loading = false;
    },
    postInstrument: (state: InitialState<Instrument[]>, action: PayloadAction<Instrument>) => {
      state.error = null;
      state.data.push(action.payload);
      state.loading = false;
    },
    apiRequested: (state: InitialState<Instrument[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Instrument[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchInstrumentsByEntryId,
  postInstrument,
  apiRequested,
  apiRequestedFailed
} = entrySlice.actions

export default entrySlice.reducer;

export const getInstrumentsByEntryId = (entryId: string) => apiCall({
  url: `http://localhost:3000/instruments/entry/${entryId}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchInstrumentsByEntryId.type,
  onError: apiRequestedFailed.type,
});

export const createInstrument = (instrument: Instrument) => apiCall({
  url: 'http://localhost:3000/instruments',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  data: instrument,
  onStart: apiRequested.type,
  onSuccess: postInstrument.type,
  onError: apiRequestedFailed.type,
});
