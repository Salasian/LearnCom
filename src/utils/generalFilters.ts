import { trainingDBState } from "../types/typeDataBase";

const parseStringDottedFormatToDate = (dateDotted: string): Date => {
  const parts = dateDotted.split(".");

  const formatterParts = parts.map((part) => parseInt(part));

  return new Date(formatterParts[2], formatterParts[1] - 1, formatterParts[0]);
};

const isDateOnRange = (from: Date, to: Date, date: Date): boolean => {
  return date >= from && date <= to;
};

const findTrainingByTrainerFirstName = (
  training: trainingDBState,
  firstName: string,
  role: string
): boolean => {
  if (role === "student") {
    return !!training.trainers.find((trainer) => {
      return trainer.firstName === firstName;
    });
  } else {
    console.log(training.participant, firstName);

    return training.student.firstName === firstName;
  }
};
export {
  isDateOnRange,
  parseStringDottedFormatToDate,
  findTrainingByTrainerFirstName,
};
