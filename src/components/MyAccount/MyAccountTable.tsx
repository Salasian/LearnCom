import { ChangeEvent } from "react";
import {
  showStudent,
  showTrainer,
  studentInputState,
  trainerInputState,
} from "../../types/typeUser";
import Button from "../Button";
import ComboBox from "../ComboBox";
import useServices from "../../services/useServices";

interface Props {
  role: string | undefined;
  inputs: studentInputState | trainerInputState;
  isEditing: boolean;
  handleChange: (e: ChangeEvent<HTMLSelectElement>, identifier: string) => void;
  setIsAdding: (isAdding: boolean) => void;
}

const MyAccountTable = ({
  role,
  inputs,
  isEditing,
  handleChange,
  setIsAdding,
}: Props) => {
  const { user, student, trainer } = useServices();
  return (
    <section
      className={`${
        isEditing && "dateOfBirth" in inputs ? "invisible" : ""
      } col-span-3 grid grid-flow-row h-[40px] mb-4`}
    >
      {isEditing ? (
        "specialization" in inputs && (
          <ComboBox
            val={inputs.specialization}
            handleChange={(e) => handleChange(e, "specialization")}
            identifier="language"
            state="default"
            list={[
              "Senior DevOps Developer",
              "Lead Software Engineer",
              "Tech Lead",
              "SCRUM Master",
            ]}
          />
        )
      ) : (
        <>
          <article className="flex flex-row justify-between mb-6">
            <h1 className="text-3xl font-bold">
              {user.role === "student" ? "My Trainers" : "My Students"}
            </h1>
            {user.role === "student" && (
              <div>
                <Button
                  name={"Add trainer"}
                  onClick={() => setIsAdding(true)}
                  state={"primary"}
                  classes="p-2"
                />
              </div>
            )}
          </article>
          <article className="flex w-full justify-between bg-slate-100 p-3 font-bold">
            <div className="flex-1">NAME</div>
            <div className="flex-1">
              {role === "student" ? "SPECIALIZATION" : "STATUS"}
            </div>
          </article>
          {student.trainers &&
            student.trainers.map((item: showTrainer, index) => {
              return (
                <article
                  className="flex w-full justify-between bg-slate-50 p-3"
                  key={index}
                >
                  <div className="flex-1 font-bold">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="flex-1">{item.specialization}</div>
                </article>
              );
            })}
          {trainer.students &&
            trainer.students.map((item: showStudent, index) => {
              return (
                <article
                  className="flex w-full justify-between bg-slate-50 p-3"
                  key={index}
                >
                  <div className="flex-1 font-bold">
                    {item.firstName} {item.lastName}
                  </div>
                  <div
                    className={`${
                      item.status ? "text-success" : "text-danger"
                    } flex-1 font-bold`}
                  >
                    {item.status ? "ACTIVE" : "NOT ACTIVE"}
                  </div>
                </article>
              );
            })}
        </>
      )}
    </section>
  );
};

export default MyAccountTable;
