import { useState } from "react";
import { studentInputState, trainerInputState } from "../../types/typeUser";
import Button from "../Button";
import ModalBox from "../ModalBox";
import { useNavigate } from "react-router-dom";
import useServices from "../../services/useServices";

interface MyAccountActionButtonsProps {
  isEditing: boolean;
  inputs: studentInputState | trainerInputState;
  setIsEditing: (isEditing: boolean) => void;
  setInputs: (inputs: studentInputState | trainerInputState) => void;
}

const MyAccountActionButtons = ({
  isEditing,
  setIsEditing,
  inputs,
  setInputs,
}: MyAccountActionButtonsProps) => {
  const {
    asyncStudentUpdateAction,
    asyncStudentInitializerAction,
    asyncTrainerInitializerAction,
    asyncTrainerUpdateAction,
    asyncStudentDeleteAction,
    deassignStudentToTrainer,
    student,
    logout,
  } = useServices();
  const [modalShowing, setModalShowing] = useState(false);
  const [copiedInputs, setCopiedInputs] = useState({ ...inputs });
  const navigate = useNavigate();

  async function confirmHandle() {
    await asyncStudentDeleteAction();
    await deleteStudentFromTrainerArray();
    await logout();
  }

  async function deleteStudentFromTrainerArray() {
    student.trainers?.forEach(async (trainer) => {
      console.log(trainer._id);

      await deassignStudentToTrainer(trainer._id);
    });
  }

  return (
    <section
      className={`flex ${
        isEditing ? "justify-center" : "justify-between"
      } my-10`}
    >
      <div className="flex justify-between space-x-10">
        <article>
          <Button
            name={isEditing ? "Cancel" : "Edit profile"}
            onClick={() => {
              setInputs(copiedInputs);
              setIsEditing(!isEditing);
            }}
            state={isEditing ? "transparent" : "primary"}
            classes="py-2 px-4"
          />
        </article>
        <article>
          <Button
            name={isEditing ? "Save changes" : "Change password"}
            onClick={async () => {
              if (isEditing) {
                setCopiedInputs({ ...inputs });
                if ("dateOfBirth" in inputs) {
                  await asyncStudentUpdateAction({
                    ...inputs,
                  } as studentInputState);
                  await asyncStudentInitializerAction();
                } else {
                  await asyncTrainerUpdateAction({
                    ...inputs,
                  } as trainerInputState);
                  await asyncTrainerInitializerAction();
                }
                setIsEditing(!isEditing);
              } else {
                navigate("/change-password");
              }
            }}
            state={isEditing ? "primary" : "success"}
            classes="py-2 px-4"
          />
        </article>
      </div>
      {!isEditing && "dateOfBirth" in inputs && (
        <div>
          <Button
            name={"Delete profile"}
            onClick={() => setModalShowing(true)}
            state={"danger"}
            classes="py-2 px-4"
          />
          <ModalBox
            modalState={"delete"}
            isShowing={modalShowing}
            setModalShowing={setModalShowing}
            confirmHandle={confirmHandle}
          />
        </div>
      )}
    </section>
  );
};

export default MyAccountActionButtons;
