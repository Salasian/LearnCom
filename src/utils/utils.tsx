import { GeneratePassword } from "js-generate-password";
import { generateUsername } from "unique-username-generator";
import { trainerDBState } from "../types/typeDataBase";
import { optionsProps } from "../types/typeDropdown";
import { showTrainer } from "../types/typeUser";

export function formatDate(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function createRandomPassword(): string {
  return GeneratePassword({ length: 10, symbols: false });
}

export function inputStateStatus(
  value: string | number,
  checkedSpaces: boolean
): "default" | "success" | "danger" {
  return checkedSpaces === false ? "default" : value ? "success" : "danger";
}

export function generateRandomUsername() {
  const username = generateUsername("", 0, 8);
  const randomInt = (Math.random() * 100).toFixed(0).toString();
  return username.concat(randomInt);
}

export function formatTrainersDBToDropdownSyntax(
  trainers: trainerDBState[]
): optionsProps[] {
  return trainers.map((trainer) => {
    return { label: trainer.firstName, value: trainer._id } as optionsProps;
  });
}

export function formatTrainersInputArrayToShowTrainerArray(
  trainerInputs: trainerDBState[]
): showTrainer[] {
  return trainerInputs.map((trainer) => {
    const { _id, firstName, lastName, specialization } =
      trainer as trainerDBState;
    return { _id, firstName, lastName, specialization } as showTrainer;
  });
}
