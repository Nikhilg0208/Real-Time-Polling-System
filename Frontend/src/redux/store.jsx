import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    // [categoryAPI.reducerPath]: categoryAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (mid) => [...mid(), userAPI.middleware],
});

export default store;
