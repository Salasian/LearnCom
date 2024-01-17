import axios from "axios";
import { studentInputState } from "../../../types/typeUser";
import { StudentActionTypes } from "../action-types/type";
import {
  studentDelete,
  studentInitialize,
  studentLogout,
  studentUpdate,
} from "../actions/action";
import { ThunkAction } from "redux-thunk";
import { State } from "../../rootReducer";
import { Action } from "redux";
import { studentDBState } from "../../../types/typeDataBase";

export const studentUpdateActionCreator = (
  newStudent: studentInputState
): studentUpdate => {
  return {
    type: StudentActionTypes.STUDENT_UPDATE,
    payload: newStudent,
  };
};

export const studentInitializeActionCreator = (
  newStudent: studentInputState
): studentInitialize => {
  return {
    type: StudentActionTypes.STUDENT_INITIALIZE,
    payload: newStudent,
  };
};

export const studentDeleteActionCreator = (): studentDelete => {
  return {
    type: StudentActionTypes.STUDENT_DELETE,
  };
};

export const studentLogoutActionCreator = (): studentLogout => {
  return {
    type: StudentActionTypes.STUDENT_LOGOUT,
  };
};

export const asyncStudentCreateAction =
  (newStudent: studentDBState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `https://mongoserverlearn-farc.onrender.com/students/`,
        newStudent,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);

      const {
        _id: id,
        firstName,
        lastName,
        email,
        status,
        dateOfBirth,
        trainers,
        address,
      } = data;

      dispatch(
        studentUpdateActionCreator({
          id,
          firstName,
          lastName,
          email,
          status,
          dateOfBirth,
          trainers,
          address,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncStudentInitializerAction =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      // Simulating an asynchronous operation, like fetching data from an API
      const response = await axios.get(
        `https://mongoserverlearn-farc.onrender.com/students/search?user=${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      const {
        _id: id,
        firstName,
        lastName,
        email,
        status,
        dateOfBirth,
        trainers,
        address,
      } = data;

      dispatch(
        studentInitializeActionCreator({
          id,
          firstName,
          lastName,
          email,
          status,
          dateOfBirth,
          trainers,
          address,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncStudentDeleteAction =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const response = await axios.delete(
        `https://mongoserverlearn-farc.onrender.com/students/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);

      dispatch(studentDeleteActionCreator());
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncStudentUpdateAction =
  (newStudent: studentInputState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      // Simulating an asynchronous operation, like fetching data from an API
      const response = await axios.put(
        `https://mongoserverlearn-farc.onrender.com/students/${userId}`,
        newStudent,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);

      const {
        _id: id,
        firstName,
        lastName,
        email,
        status,
        dateOfBirth,
        trainers,
        address,
      } = data;

      dispatch(
        studentUpdateActionCreator({
          id,
          firstName,
          lastName,
          email,
          status,
          dateOfBirth,
          trainers,
          address,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };
