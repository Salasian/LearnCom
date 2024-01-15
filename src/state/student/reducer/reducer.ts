import { showTrainer, studentInputState } from "../../../types/typeUser";
import { StudentActionTypes } from "../action-types/type";
import { StudentAction } from "../actions/action";

const initialState = {
  address: "",
  dateOfBirth: "",
  firstName: "",
  lastName: "",
  status: false,
  email: "",
  trainers: [] as showTrainer[],
} as studentInputState;

const studentReducer = (state = initialState, action: StudentAction) => {
  switch (action.type) {
    case StudentActionTypes.STUDENT_UPDATE:
      return { ...state, ...action.payload };
    case StudentActionTypes.STUDENT_INITIALIZE:
      return action.payload;
    case StudentActionTypes.STUDENT_DELETE:
      return initialState;
    case StudentActionTypes.STUDENT_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default studentReducer;
