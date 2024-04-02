import { Middleware } from "@reduxjs/toolkit";
import { apiCall } from "../actions/api.action";
import axios from "axios";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiMiddleware: Middleware = ({ dispatch }) => (next: any) => async (action: any) => {

  if(action.type !== apiCall.type) {
    return next(action);
  }

  const { url, method, data, headers, onSuccess, onError, onStart } = action.payload;

  if(onStart) {
    dispatch({ type: onStart });
  }

  try {
    const response = await axios.request({
      baseURL: "http://localhost:3000/api",
      headers,
      url,
      method,
      data,
    });
    dispatch({ type: onSuccess, payload: response.data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("==========>", error)
    dispatch({ 
      type: onError, 
      payload: { 
        message: error.response.data.message,
        code: error.response.data.statusCode,
      }
    });
  }
}