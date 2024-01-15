import { showTrainer, showStudent, studentInputState } from "./typeUser";

interface userDBState {
  username: string;
  role: string;
  password: string;
}

interface studentDBState {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  user: string;
  status: boolean;
  trainers?: showTrainer[];
}

interface trainerDBState {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  address: string;
  user: string;
  status: boolean;
  students?: showStudent[];
}

interface trainingDBState {
  startDate: string;
  name: string;
  type: string;
  participant: string;
  duration: number;
  description: string;
  student: studentInputState;
  trainers: trainerDBState[];
}

export type { userDBState, trainerDBState, studentDBState, trainingDBState };
