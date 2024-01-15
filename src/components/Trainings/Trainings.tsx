import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import { TrainingsInputsForm } from "../../types/typeTrainings";
import TrainingsForm from "./TrainingsForm";
import TrainigsDatePicker from "./TrainingsDatePicker";
import TrainingsTable from "./TrainingsTable";
import useServices from "../../services/useServices";
import { trainingDBState } from "../../types/typeDataBase";

const initialState = {
  trainer: "",
  type: "",
  from: new Date(),
  to: new Date(),
  passedTrainings: [] as trainingDBState[],
} as TrainingsInputsForm;

const Trainings = () => {
  const { user, trainings, navigate } = useServices();
  const { role } = user;
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInputs({ ...inputs, [identifier]: e.target.value });
  };

  useEffect(() => {
    setInputs({ ...inputs, passedTrainings: trainings });
  }, [trainings]);

  return (
    <section>
      <h1 className="text-4xl font-bold text-center mb-10">Trainings</h1>
      {role === "student" && (
        <section className="flex space-x-4">
          <div className="w-28">
            <Button
              name={"Add training"}
              onClick={() => navigate("/training/add")}
              state={"success"}
            />
          </div>
          <div className="w-28">
            <Button
              name={"My Account"}
              onClick={() => navigate("/my-account")}
              state={"primary"}
            />
          </div>
        </section>
      )}
      <div className="grid grid-flow-col gap-8">
        <TrainingsForm
          inputs={inputs}
          setInputs={setInputs}
          handleChange={handleChange}
          role={role}
        />
        <section className="container m-auto">
          <TrainigsDatePicker inputs={inputs} setInputs={setInputs} />
        </section>
      </div>
      <section>
        <h1 className="text-4xl font-bold mb-4">
          {role === "student" ? "My passed trainings" : "Results"}
        </h1>
        <TrainingsTable
          role={role}
          passedTrainings={
            inputs.passedTrainings.length !== 0
              ? inputs.passedTrainings
              : trainings
          }
        />
      </section>
    </section>
  );
};

export default Trainings;
