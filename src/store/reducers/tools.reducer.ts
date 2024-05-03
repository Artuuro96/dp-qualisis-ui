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