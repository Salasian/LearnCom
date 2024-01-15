import { trainingDBState } from "./typeDataBase";

interface TrainingsInputsForm {
  trainer: string;
  type: string;
  from: Date;
  to: Date;
  passedTrainings: Array<trainingDBState>;
}

export type { TrainingsInputsForm };
