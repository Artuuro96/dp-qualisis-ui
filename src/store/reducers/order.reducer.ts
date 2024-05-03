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

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchAllOrders: (state: InitialState<Order[]>, action: PayloadAction<Response<Order[]>>) => {
      state.error = null;
      state.data = action.payload.result;
      state.loading = false;
    },
    fetchOrdersByDateRange: (state: InitialState<Order[]>, action: PayloadAction<Response<Order[]>>) => {
      state.error = null;
      state.data = action.payload.result;
    },
    postOrder: (state: InitialState<Order[]>, action: PayloadAction<Order>) => {
      state.error = null;
      state.data.push(action.payload);
      state.loading = false;
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
  fetchOrdersByDateRange,
  fetchAllOrders,
  postOrder,
  apiRequested,
  apiRequestedFailed,
} = orderSlice.actions;

export default orderSlice.reducer;

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
  onSuccess: postOrder.type,
  onError: apiRequestedFailed.type,
});

export const getOrdersByDateRange = (startDate: string, endDate: string) => apiCall({
  url: `http://localhost:3000/orders/by-dates?startDate=${startDate}&endDate=${endDate}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  onStart: apiRequested.type,
  onSuccess: fetchOrdersByDateRange.type,
  onError: apiRequestedFailed.type,
})