import { showStudent, trainerInputState } from "../../../types/typeUser";
import { TrainerActionTypes } from "../action-types/type";
import { TrainerAction } from "../actions/actions";

const initialState = {
  address: "",
  firstName: "",
  lastName: "",
  specialization: "",
  status: false,
  email: "",
  students: [] as showStudent[],
} as trainerInputState;

const trainerReducer = (state = initialState, action: TrainerAction) => {
  switch (action.type) {
    case TrainerActionTypes.TRAINER_UPDATE:
      return { ...state, ...action.payload };
    case TrainerActionTypes.TRAINER_INITIALIZE:
      return action.payload;
    case TrainerActionTypes.TRAINER_DELETE:
      return initialState;
    case TrainerActionTypes.TRAINER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default trainerReducer;
