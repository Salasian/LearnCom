/* eslint-disable no-case-declarations */
import { userInputState } from "../../../types/typeUser";
import { UserActionTypes } from "../action-types/userActionTypes";
import { UserAction } from "../actions/userActions";

const initialState = {
  id: "",
  username: "",
  role: "",
} as userInputState;

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.USER_UPDATE:
      return { ...state, ...action.payload };
    case UserActionTypes.USER_LOGIN:
      return action.payload;
    case UserActionTypes.USER_CREATE:
      return action.payload;
    case UserActionTypes.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
