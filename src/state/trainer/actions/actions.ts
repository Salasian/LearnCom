import { trainerInputState } from "../../../types/typeUser";
import { TrainerActionTypes } from "../action-types/type";

export interface trainerUpdate {
  type: TrainerActionTypes.TRAINER_UPDATE;
  payload: trainerInputState;
}

export interface trainerDelete {
  type: TrainerActionTypes.TRAINER_DELETE;
}

export interface trainerInitialize {
  type: TrainerActionTypes.TRAINER_INITIALIZE;
  payload: trainerInputState;
}

export interface trainerLogout {
  type: TrainerActionTypes.TRAINER_LOGOUT;
}

export type TrainerAction =
  | trainerUpdate
  | trainerDelete
  | trainerInitialize
  | trainerLogout;
