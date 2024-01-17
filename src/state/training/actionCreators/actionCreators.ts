import { ThunkAction } from "redux-thunk";
import { TrainingActionTypes } from "../action-type/TrainingActionTypes";
import { trainingAdd, trainingInitialize } from "../actions/action";
import { State } from "../../rootReducer";
import { Action } from "redux";
import axios from "axios";
import { trainingDBState } from "../../../types/typeDataBase";

export const trainingAddActionCreator = (
  newTraining: trainingDBState
): trainingAdd => {
  return {
    type: TrainingActionTypes.TRAINING_ADD,
    payload: newTraining,
  };
};

export const trainingInitializeActionCreator = (
  newTrainings: trainingDBState[]
): trainingInitialize => {
  return {
    type: TrainingActionTypes.TRAINING_INITIALIZE,
    payload: newTrainings,
  };
};

export const asyncTrainingCreateAction =
  (newTraining: trainingDBState): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    try {
      console.log(newTraining);

      const response = await axios.post(
        `https://mongoserverlearn-farc.onrender.com/trainings/`,
        newTraining,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      console.log("Async data:", data);

      const {
        duration,
        description,
        name,
        participant,
        startDate,
        type,
        trainers,
        student,
      } = data;

      dispatch(
        trainingAddActionCreator({
          startDate,
          name,
          type,
          participant,
          duration,
          description,
          student,
          trainers,
        } as trainingDBState)
      );
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };

export const asyncTrainingInitializerAction =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const { user, student: studentState } = getState();
      const uri = user.role === "student" ? `/student/${studentState.id}` : ``;

      const response = await axios.get(
        `https://mongoserverlearn-farc.onrender.com/trainings${uri}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.data;

      dispatch(trainingInitializeActionCreator([...data] as trainingDBState[]));
      return data;
    } catch (error) {
      console.error("Async operation error:", error);
    }
  };
