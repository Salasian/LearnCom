import { Tuple, configureStore } from "@reduxjs/toolkit";
import rootReducer, { State } from "./rootReducer";
import { Middleware } from "@reduxjs/toolkit";
import asyncFunctionMiddleware from "./asyncFunctionMiddleware";

const asyncMiddleware: Middleware<object, State> =
  (storeAPI) => (next) => (action) => {
    if (typeof action === "function") {
      return action(storeAPI.dispatch, storeAPI.getState);
    }

    return next(action);
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    new Tuple(
      ...getDefaultMiddleware(),
      asyncMiddleware,
      asyncFunctionMiddleware
    ),
});

export * as userActionCreators from "../state/user/";
export * as trainerActionCreators from "../state/trainer/";
