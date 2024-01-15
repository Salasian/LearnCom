import profileImage from "../../assets/profileImage.jpg";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import Button from "../Button";
import { studentInputState, trainerInputState } from "../../types/typeUser";
import ModalBox from "../ModalBox";
import { useState } from "react";

interface Props {
  inputs: studentInputState | trainerInputState;
  isEditing: boolean;
}
const MyAccountVisibility = ({ inputs, isEditing }: Props) => {
  const [IsModalShowing, setIsModalShowing] = useState(false);
  return (
    <article className="flex flex-row">
      <div className="w-[160px] h-[160px]">
        <img
          src={profileImage}
          alt="profile image"
          className="bg-primary-200 rounded-lg flex-1"
        />
      </div>
      {isEditing ? (
        <section className="flex flex-col p-4">
          <h1 className="text-md font-semibold">Upload your photo</h1>
          <span className="text-sm">
            Your photo shoul be in PNG or JPG format
          </span>
          <div className="flex flex-row mt-4">
            <Button
              name={"Choose image"}
              onClick={() => setIsModalShowing(true)}
              state={"transparent"}
              classes="border border-primary text-primary"
            />
            <ModalBox
              modalState={"upload"}
              isShowing={IsModalShowing}
              setModalShowing={setIsModalShowing}
              confirmHandle={() => {}}
            />
            <Button name={"Remove"} onClick={() => {}} state={"transparent"} />
          </div>
        </section>
      ) : (
        <div className="ml-6">
          <p className="font-bold">Status</p>
          <p
            className={`${
              inputs.status ? "text-success" : "text-danger"
            } flex items-center font-bold`}
          >
            {inputs.status ? (
              <>
                <FaRegCircleCheck />
                &ensp;
                <span>Active</span>
              </>
            ) : (
              <>
                <RxCrossCircled />
                &ensp;
                <span>Not Active</span>
              </>
            )}
          </p>
        </div>
      )}
    </article>
  );
};

export default MyAccountVisibility;
