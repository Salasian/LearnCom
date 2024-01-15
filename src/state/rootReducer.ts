import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/reducers/userReducer";
import trainerReducer from "./trainer/reducers/trainerReducer";
import studentReducer from "./student/reducer/reducer";
import trainingReducer from "./training/reducer/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  trainer: trainerReducer,
  student: studentReducer,
  trainings: trainingReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
