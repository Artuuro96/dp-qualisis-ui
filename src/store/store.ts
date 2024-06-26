import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './reducers/order.reducer';
import { apiMiddleware } from './middleware/api.middleware';
import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/user.reducer';
import roleReducer from './reducers/role.reducer';
import moduleReducer from './reducers/module.reducer';
import permissionReducer from './reducers/permission.reducer';
import entryReducer from './reducers/entry.reducer';
import instrumentReducer from './reducers/instrument.reducer';
import clientReducer from './reducers/client.reducer';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    modules: moduleReducer,
    entries: entryReducer,
    instruments: instrumentReducer,
    permission: permissionReducer,
    clients: clientReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware), 
})

export default store;