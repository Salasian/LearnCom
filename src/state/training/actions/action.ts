import { trainingDBState } from "../../../types/typeDataBase";
import { TrainingActionTypes } from "../action-type/TrainingActionTypes";

export interface trainingAdd {
  type: TrainingActionTypes.TRAINING_ADD;
  payload: trainingDBState;
}

export interface trainingInitialize {
  type: TrainingActionTypes.TRAINING_INITIALIZE;
  payload: trainingDBState[];
}

export type TrainingAction = trainingAdd | trainingInitialize;
