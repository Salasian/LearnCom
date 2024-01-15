import { trainingDBState } from "../types/typeDataBase";
import {
  isDateOnRange,
  parseStringDottedFormatToDate,
  findTrainingByTrainerFirstName,
} from "./generalFilters";

export const filterTrainings = (
  trainer: string,
  type: string,
  from: Date,
  to: Date,
  passedTrainings: trainingDBState[],
  role: string
): trainingDBState[] => {
  console.log({ trainer, type, from, to, passedTrainings });

  let filteredTrainings: trainingDBState[] = passedTrainings;
  console.log(filteredTrainings);

  if (from && to && from !== to) {
    const firstFilter = filteredTrainings.filter((training) =>
      isDateOnRange(from, to, parseStringDottedFormatToDate(training.startDate))
    );
    if (firstFilter.length !== 0) filteredTrainings = firstFilter;
    console.log(filteredTrainings);
  }
  if (type) {
    const secondFilter = filteredTrainings.filter(
      (training) => training.type === type
    );
    if (secondFilter.length !== 0) filteredTrainings = secondFilter;
    console.log(filteredTrainings);
  }
  if (trainer) {
    const thirdFilter = filteredTrainings.filter((training) => {
      if (findTrainingByTrainerFirstName(training, trainer, role))
        return training;
    });

    if (thirdFilter.length !== 0) filteredTrainings = thirdFilter;
    console.log(filteredTrainings);
  }
  return filteredTrainings;
};
