import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { Role } from "../../types/role.interface";
import { getToken } from "../../utils/get-context.util";
import { apiCall } from "../actions/api.action";

const initialState: InitialState<Role[]> = {
  loading: false,
  data: [],
  error: null,
}

export const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchAllRoles: (state: InitialState<Role[]>, action: PayloadAction<Role[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    apiRequested: (state: InitialState<Role[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Role[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchAllRoles,
  apiRequested,
  apiRequestedFailed,
} = roleSlice.actions;

export default roleSlice.reducer;

export const getRoles = () => apiCall({
  url: 'http://localhost/api/v1/role',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllRoles.type,
  onError: apiRequestedFailed.type,
})