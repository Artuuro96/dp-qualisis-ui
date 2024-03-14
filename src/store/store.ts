import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './reducers/client.reducer';
import { apiMiddleware } from './middleware/api.middleware';
import authReducer from './reducers/auth.reducer';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), 
})

export default store;