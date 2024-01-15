import { showStudent, showTrainer } from "./typeUser";

export interface trainingInputState {
  startDate: string;
  name: string;
  type: string;
  participant: string;
  duration: number;
  description: string;
  trainers: showTrainer[];
  student: showStudent;
}
