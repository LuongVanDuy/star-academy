import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user";
import unitReducer from "./unit";
import lessonReducer from "./lesson";

const rootReducer = combineReducers({
  user: userReducer,
  unit: unitReducer,
  lesson: lessonReducer,
});

export default rootReducer;
