import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/loginUser";
import userReducer from "../reducers/fetchUsers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export default store;
