import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { getToken } from "../../utils/get-context.util";
import { apiCall } from "../actions/api.action";
import { Order } from "../../types/order.interface";
import { Response } from "../../types/order-response";

const initialState: InitialState<Order[]> = {
  loading: false,
  data: [],
  error: null,
}

export const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    fetchAllOrders: (state: InitialState<Order[]>, action: PayloadAction<Response<Order[]>>) => {
      state.error = null;
      state.data = action.payload.result;
      state.loading = false;
    },
    postOrder: (state: InitialState<Order[]>, action: PayloadAction<Order>) => {
      state.error = null;
      state.data.push(action.payload)
    },
    apiRequested: (state: InitialState<Order[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Order[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchAllOrders,
  postOrder,
  apiRequested,
  apiRequestedFailed,
} = moduleSlice.actions;

export default moduleSlice.reducer;

export const getOrders = () => apiCall({
  url: 'http://localhost:3000/orders',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllOrders.type,
  onError: apiRequestedFailed.type,
});

export const createOrder = (order: Order) => apiCall({
  url: 'http://localhost:3000/orders',
  method: 'POST',
  data: order,
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllOrders.type,
  onError: apiRequestedFailed.type,
});