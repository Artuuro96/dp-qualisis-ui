import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types/inital-state.interface";
import { User } from "../../types/user.interface";
import { apiCall } from "../actions/api.action";
import { getToken } from "../../utils/get-context.util";

const initialState: InitialState<User[]> = {
  loading: false,
  data: [],
  error: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchAllUsers: (state: InitialState<User[]>, action: PayloadAction<User[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    postUser: (state: InitialState<User[]>, action: PayloadAction<User>) => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    removeUser: (state: InitialState<User[]>, action: PayloadAction<{id: string}>) => {
      const filteredUsers = state.data.filter(user => user.id !== action.payload.id);
      state.data = filteredUsers;
      state.loading = false;
      state.error = null;
    },
    editUser: (state: InitialState<User[]>, action: PayloadAction<User>) => {
      const index = state.data.findIndex(user => user.id === action.payload.id);
      state.data[index] = action.payload;
      state.loading = false;
      state.error = null;
    },
    apiRequested: (state: InitialState<User[]>) => {
      state.loading = true;
    },
    apiRequestedFailed: (state: InitialState<User[]>, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
});

export const {
  fetchAllUsers,
  postUser,
  editUser,
  removeUser,
  apiRequested,
  apiRequestedFailed
} = userSlice.actions

export default userSlice.reducer;

export const getUsers = () => apiCall({
  url: 'http://localhost/api/v1/user',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  onStart: apiRequested.type,
  onSuccess: fetchAllUsers.type,
  onError: apiRequestedFailed.type,
});

export const createUser = (user: User) => apiCall({
  url: 'http://localhost/api/v1/user',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  data: user,
  onStart: apiRequested.type,
  onSuccess: postUser.type,
  onError: apiRequestedFailed.type,
});

export const deleteUser = (id: string) => apiCall({
  url: `http://localhost/api/v1/user/${id}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  onStart: apiRequested.type,
  onSuccess: removeUser.type,
  onError: apiRequestedFailed.type,
});

export const updateUser = (user: User) => apiCall({
  url: `http://localhost/api/v1/user/${user.id}`,
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  data: user,
  onStart: apiRequested.type,
  onSuccess: editUser.type,
  onError: apiRequestedFailed.type,
})
