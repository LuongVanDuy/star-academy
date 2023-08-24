import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
