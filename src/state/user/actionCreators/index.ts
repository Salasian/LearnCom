import { ThunkAction } from "redux-thunk";
import { userInputState } from "../../../types/typeUser";
import { UserActionTypes } from "../action-types/userActionTypes";
import {
  userCreate,
  userLogin,
  userLogout,
  userUpdate,
} from "../actions/userActions";
import { State } from "../../rootReducer";
import { Action } from "redux";
import axios from "axios";
import { userDBState } from "../../../types/typeDataBase";

export const userUpdateActionCreator = (
  newUser: userInputState
): userUpdate => ({
  type: UserActionTypes.USER_UPDATE,
  payload: newUser,
});

export const userloginUserAction = (userData: userInputState): userLogin => ({
  type: UserActionTypes.USER_LOGIN,
  payload: userData,
});

export const userCreateUserAction = (newUser: userInputState): userCreate => ({
  type: UserActionTypes.USER_CREATE,
  payload: newUser,
});

export const userlogoutUserAction = (): userLogout => ({
  type: UserActionTypes.USER_LOGOUT,
});

export const asyncCreateUserAction =
  (user: userDBState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `https://mongoserverlearn.onrender.com/users/`,
        user,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);
      const { role, username, _id: id } = data;
      dispatch(
        userCreateUserAction({ role, username, id: id } as userInputState)
      );
      return data;
    } catch (error) {
      return error;
    }
  };

export const asyncLoginUserAction =
  (
    username: string,
    password: string
  ): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://mongoserverlearn.onrender.com/users/login?username=${username}&password=${password}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);

      const { _id: id, role } = data;

      const userLogin = { id, username, role };

      dispatch(userloginUserAction(userLogin));
      return data;
    } catch (error) {
      dispatch(userloginUserAction({ id: "", username: "", role: "failed" }));
      return error;
    }
  };

export const asyncUpdateUserAction =
  (user: userDBState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      const response = await axios.put(
        `https://mongoserverlearn.onrender.com/users/${user.username}`,
        user,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      const { _id: id, role, username } = data;

      const userLogin = { id, username, role };

      dispatch(userUpdateActionCreator(userLogin));
      return data;
    } catch (error) {
      return error;
    }
  };
