import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authAPI";
import { userReducer } from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    // [categoryAPI.reducerPath]: categoryAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (mid) => [...mid(), authApi.middleware],
});

export default store;
