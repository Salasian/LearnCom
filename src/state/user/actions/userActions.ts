import { userInputState } from "../../../types/typeUser";
import { UserActionTypes } from "../action-types/userActionTypes";

export interface userUpdate {
  type: UserActionTypes.USER_UPDATE;
  payload: userInputState;
}

export interface userLogin {
  type: UserActionTypes.USER_LOGIN;
  payload: userInputState;
}

export interface userLogout {
  type: UserActionTypes.USER_LOGOUT;
}

export interface userCreate {
  type: UserActionTypes.USER_CREATE;
  payload: userInputState;
}

export type UserAction = userUpdate | userLogin | userLogout | userCreate;
