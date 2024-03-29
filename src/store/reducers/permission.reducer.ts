import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { getToken } from "../../utils/get-context.util";
import { apiCall } from "../actions/api.action";
import { Permission } from "../../types/permission.interface";

const initialState: InitialState<Permission[]> = {
  loading: false,
  data: [],
  error: null,
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    fetchPermissionsByRoleId: (state: InitialState<Permission[]>, action: PayloadAction<Permission[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    apiRequested: (state: InitialState<Permission[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<Permission[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchPermissionsByRoleId,
  apiRequested,
  apiRequestedFailed,
} = permissionSlice.actions;

export default permissionSlice.reducer;

export const getPermissionsByRoleId = (roleId: string) => apiCall({
  url: `http://localhost/api/v1/permission/roles/${roleId}`,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchPermissionsByRoleId.type,
  onError: apiRequestedFailed.type,
})