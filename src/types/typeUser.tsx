interface showStudent {
  firstName: string;
  lastName: string;
  status: boolean;
}

interface showTrainer {
  _id: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

interface userInputState {
  id: string;
  username: string;
  role: string;
}

interface trainerInputState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  status: boolean;
  specialization: string;
  students?: Array<showStudent>;
}

interface studentInputState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  status: boolean;
  dateOfBirth: string;
  trainers?: Array<showTrainer>;
}

export type {
  showStudent,
  showTrainer,
  studentInputState,
  trainerInputState,
  userInputState,
};
