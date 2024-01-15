import { Dispatch, Action } from "redux";
import { State } from "./rootReducer";

export type AppThunk<ReturnType = void> = (
  dispatch: Dispatch<Action>,
  getState: () => State
) => ReturnType;
