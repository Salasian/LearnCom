import { bindActionCreators } from "redux";
import { userActionCreators } from "../state/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { State } from "../state/rootReducer";
import { useNavigate } from "react-router-dom";
import { trainerActionCreators } from "../state/trainer";
import { studentActionCreators } from "../state/student";
import { trainingActionCreators } from "../state/training";
import axios from "axios";

const useServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userUpdateActionCreator, //This should not be here, erase it when is not in use
    userlogoutUserAction,
    asyncLoginUserAction,
    asyncUpdateUserAction,
    asyncCreateUserAction,
  } = bindActionCreators(userActionCreators, dispatch);

  const {
    trainerUpdateActionCreator, //This should not be here, erase it when is not in use
    trainerLogoutActionCreator,
    asyncTrainerCreateAction,
    asyncTrainerDeleteAction,
    asyncTrainerInitializerAction,
    asyncTrainerUpdateAction,
  } = bindActionCreators(trainerActionCreators, dispatch);

  const {
    studentUpdateActionCreator,
    studentLogoutActionCreator, //This should not be here, erase it when is not in use
    asyncStudentInitializerAction,
    asyncStudentCreateAction,
    asyncStudentDeleteAction,
    asyncStudentUpdateAction,
  } = bindActionCreators(studentActionCreators, dispatch);

  const { asyncTrainingCreateAction, asyncTrainingInitializerAction } =
    bindActionCreators(trainingActionCreators, dispatch);

  const logout = () => {
    userlogoutUserAction();
    studentLogoutActionCreator();
    trainerLogoutActionCreator();
  };

  const user = useSelector((state: State) => state.user);
  const trainer = useSelector((state: State) => state.trainer);
  const student = useSelector((state: State) => state.student);
  const trainings = useSelector((state: State) => state.trainings);

  const assignStudentToTrainer = async (trainerId: string) => {
    const response = await axios.put(
      `https://mongoserverlearn-farc.onrender.com/trainers/addStudent/${trainerId}`,
      { studentId: student.id }
    );
    const data = await response.data;
    return data;
  };

  const deassignStudentToTrainer = async (trainerId: string) => {
    console.log("Deassign student to trainer id", trainerId);

    const response = await axios.put(
      `https://mongoserverlearn-farc.onrender.com/trainers/deleteStudent/${trainerId}`,
      { studentId: student.id }
    );
    const data = await response.data;
    return data;
  };

  return {
    user,
    trainer,
    student,
    trainings,
    logout,
    assignStudentToTrainer,
    deassignStudentToTrainer,
    userUpdateActionCreator,
    asyncLoginUserAction,
    userlogoutUserAction,
    asyncCreateUserAction,
    asyncUpdateUserAction,
    trainerUpdateActionCreator,
    trainerLogoutActionCreator,
    asyncTrainerCreateAction,
    asyncTrainerDeleteAction,
    asyncTrainerInitializerAction,
    asyncTrainerUpdateAction,
    studentUpdateActionCreator,
    studentLogoutActionCreator,
    asyncStudentInitializerAction,
    asyncStudentCreateAction,
    asyncStudentDeleteAction,
    asyncStudentUpdateAction,
    asyncTrainingCreateAction,
    asyncTrainingInitializerAction,
    navigate,
  };
};

export default useServices;
