import { Middleware } from "redux";
import { State } from "./rootReducer";

const asyncFunctionMiddleware: Middleware<object, State> =
  (storeAPI) => (next) => (action) => {
    if (typeof action === "function") {
      return action(storeAPI.dispatch, storeAPI.getState);
    }

    return next(action);
  };

export default asyncFunctionMiddleware;
