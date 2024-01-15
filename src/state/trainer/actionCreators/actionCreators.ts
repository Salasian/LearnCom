import axios from "axios";
import { trainerInputState } from "../../../types/typeUser";
import { TrainerActionTypes } from "../action-types/type";
import {
  trainerDelete,
  trainerInitialize,
  trainerLogout,
  trainerUpdate,
} from "../actions/actions";
import { ThunkAction } from "redux-thunk";
import { State } from "../../rootReducer";
import { Action } from "redux";
import { trainerDBState } from "../../../types/typeDataBase";

export const trainerUpdateActionCreator = (
  newTrainer: trainerInputState
): trainerUpdate => ({
  type: TrainerActionTypes.TRAINER_UPDATE,
  payload: newTrainer,
});

export const trainerInitializeActionCreator = (
  newTrainer: trainerInputState
): trainerInitialize => ({
  type: TrainerActionTypes.TRAINER_INITIALIZE,
  payload: newTrainer,
});

export const trainerDeleteActionCreator = (): trainerDelete => ({
  type: TrainerActionTypes.TRAINER_DELETE,
});

export const trainerLogoutActionCreator = (): trainerLogout => ({
  type: TrainerActionTypes.TRAINER_LOGOUT,
});

export const asyncTrainerCreateAction =
  (newTrainer: trainerDBState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `https://mongoserverlearn.onrender.com/trainers/`,
        newTrainer,
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
        specialization,
        students,
        address,
      } = data;

      dispatch(
        trainerUpdateActionCreator({
          id,
          firstName,
          lastName,
          email,
          status,
          specialization,
          students,
          address,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncTrainerInitializerAction =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const response = await axios.get(
        `https://mongoserverlearn.onrender.com/trainers/search?user=${userId}`,
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
        specialization,
        students,
        address,
      } = data;

      const trainer = {
        id,
        firstName,
        lastName,
        email,
        status,
        specialization,
        students,
        address,
      };

      dispatch(
        trainerUpdateActionCreator({
          ...trainer,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncTrainerDeleteAction =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const response = await axios.delete(
        `https://mongoserverlearn.onrender.com/trainers/${userId}`
      );
      const data = await response.data;

      console.log("Async data:", data);

      dispatch(trainerDeleteActionCreator());
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncTrainerUpdateAction =
  (newTrainer: trainerInputState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
      const response = await axios.put(
        `https://mongoserverlearn.onrender.com/trainers/${userId}`,
        newTrainer,
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
        specialization,
        students,
        address,
      } = data;

      dispatch(
        trainerUpdateActionCreator({
          id,
          firstName,
          lastName,
          email,
          status,
          specialization,
          students,
          address,
        })
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };
