import axios, { AxiosResponse } from "axios";
import { ApiUserResponse } from "../types/typeAsyncUtils";
import { showStudent, showTrainer } from "../types/typeUser";
import {
  studentDBState,
  trainerDBState,
  trainingDBState,
} from "../types/typeDataBase";
import { optionsProps } from "../types/typeDropdown";

export const getUserById = async (
  id: string
): Promise<ApiUserResponse | undefined> => {
  try {
    const res: AxiosResponse<ApiUserResponse> =
      await axios.get<ApiUserResponse>(
        `https://mongoserverlearn-farc.onrender.com/users/search?_id=${id}`
      );
    if (res.data) {
      return res.data;
    } else {
      return { password: "", username: "", role: "" };
    }
  } catch (error) {
    console.log(error);
  }
};

export async function getTrainerByDropdownProp(
  option: optionsProps
): Promise<trainerDBState> {
  try {
    const res: AxiosResponse<trainerDBState> = await axios.get<trainerDBState>(
      `https://mongoserverlearn-farc.onrender.com/trainers/search?_id=${option.value}`
    );
    if (res.data) {
      return res.data as trainerDBState;
    } else {
      return {} as trainerDBState;
    }
  } catch (error) {
    console.log(error);
    return {} as trainerDBState;
  }
}

export const getAllTrainers = async (): Promise<
  trainerDBState[] | undefined
> => {
  try {
    const res: AxiosResponse<trainerDBState[]> = await axios.get<
      trainerDBState[]
    >(`https://mongoserverlearn-farc.onrender.com/trainers/`);
    if (res.data) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTrainersFormatShow = async (): Promise<showTrainer[]> => {
  const allTrainersArray: trainerDBState[] | undefined = await getAllTrainers();
  if (allTrainersArray) {
    return allTrainersArray.map((trainer) => {
      const { firstName, lastName, specialization, _id } = trainer;
      return { firstName, lastName, specialization, _id } as showTrainer;
    });
  } else {
    return [];
  }
};

export const getAllStudents = async (): Promise<
  studentDBState[] | undefined
> => {
  try {
    const res: AxiosResponse<studentDBState[]> = await axios.get<
      studentDBState[]
    >(`https://mongoserverlearn-farc.onrender.com/students/`);
    if (res.data) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStudentById = async (
  userId: string
): Promise<studentDBState | undefined> => {
  try {
    const res: AxiosResponse<studentDBState> = await axios.get<studentDBState>(
      `https://mongoserverlearn-farc.onrender.com/students/search?user:${userId}`
    );
    if (res.data) {
      return res.data;
    } else {
      return {} as studentDBState;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllStudentsFormatShow = async (): Promise<showStudent[]> => {
  const allStudentsArray: studentDBState[] | undefined = await getAllStudents();
  if (allStudentsArray) {
    return allStudentsArray.map((student) => {
      const { firstName, lastName, status } = student;
      return { firstName, lastName, status } as showStudent;
    });
  } else {
    return [];
  }
};

export const getAllTrainings = async (): Promise<
  trainingDBState[] | undefined
> => {
  try {
    const res: AxiosResponse<trainingDBState[]> = await axios.get<
      trainingDBState[]
    >(`https://mongoserverlearn-farc.onrender.com/trainings/`);
    if (res.data) {
      return res.data;
    } else {
      return [] as trainingDBState[];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTrainingsByStudentId = async (
  studentId: string
): Promise<trainingDBState[] | undefined> => {
  try {
    const res: AxiosResponse<trainingDBState[]> = await axios.get<
      trainingDBState[]
    >(
      `https://mongoserverlearn-farc.onrender.com/trainings/student/${studentId}`
    );
    if (res.data) {
      return res.data;
    } else {
      return [] as trainingDBState[];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTrainingsByTrainerId = async (
  trainerId: string
): Promise<trainingDBState[] | undefined> => {
  try {
    const res: AxiosResponse<trainingDBState[]> = await axios.get<
      trainingDBState[]
    >(
      `https://mongoserverlearn-farc.onrender.com/trainings/trainer/${trainerId}`
    );
    if (res.data) {
      return res.data;
    } else {
      return [] as trainingDBState[];
    }
  } catch (error) {
    console.log(error);
  }
};
