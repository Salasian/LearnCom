import { studentInputState } from "../../../types/typeUser";
import { StudentActionTypes } from "../action-types/type";

export type studentUpdate = {
  type: StudentActionTypes.STUDENT_UPDATE;
  payload: studentInputState;
};

export type studentInitialize = {
  type: StudentActionTypes.STUDENT_INITIALIZE;
  payload: studentInputState;
};

export type studentDelete = {
  type: StudentActionTypes.STUDENT_DELETE;
};

export type studentLogout = {
  type: StudentActionTypes.STUDENT_LOGOUT;
};

export type StudentAction =
  | studentUpdate
  | studentInitialize
  | studentDelete
  | studentLogout;
