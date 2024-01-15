import { trainingDBState } from "../../../types/typeDataBase";
import { TrainingActionTypes } from "../action-type/TrainingActionTypes";
import { TrainingAction } from "../actions/action";

const initialState = [] as trainingDBState[];

const trainingReducer = (state = initialState, action: TrainingAction) => {
  switch (action.type) {
    case TrainingActionTypes.TRAINING_ADD:
      return [...state, action.payload];
    case TrainingActionTypes.TRAINING_INITIALIZE:
      return [...action.payload];
    default:
      return state;
  }
};

export default trainingReducer;
